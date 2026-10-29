import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi } from 'vitest';
import { LaunchModal } from './LaunchModal';
import type { Launch } from '../../types';

const mockLaunch: Launch = {
    flight_number: 1,
    mission_name: 'Test Mission',
    mission_id: [],
    upcoming: false,
    launch_year: '2020',
    launch_date_unix: 1234567890,
    launch_date_utc: '2020-01-01T00:00:00.000Z',
    launch_date_local: '2020-01-01T00:00:00+00:00',
    is_tentative: false,
    tentative_max_precision: 'hour',
    tbd: false,
    launch_window: 0,
    rocket: {
        rocket_id: 'falcon9',
        rocket_name: 'Falcon 9',
        rocket_type: 'v1.0',
        first_stage: {
            cores: []
        },
        second_stage: {
            block: 1,
            payloads: []
        },
        fairings: null
    },
    ships: [],
    telemetry: {
        flight_club: null
    },
    launch_site: {
        site_id: 'test',
        site_name: 'Test Site',
        site_name_long: 'Cape Canaveral Air Force Station'
    },
    launch_success: true,
    launch_failure_details: null,
    links: {
        mission_patch: 'https://example.com/patch.png',
        mission_patch_small: 'https://example.com/patch_small.png',
        reddit_campaign: null,
        reddit_launch: null,
        reddit_recovery: null,
        reddit_media: null,
        presskit: null,
        article_link: null,
        wikipedia: null,
        video_link: null,
        youtube_id: null,
        flickr_images: []
    },
    details: 'Test mission details',
    static_fire_date_utc: null,
    static_fire_date_unix: null,
    timeline: {}
};

const renderWithProvider = (component: React.ReactElement) => {
    return render(
        <MantineProvider>
            {component}
        </MantineProvider>
    );
};

describe('LaunchModal', () => {
    it('renders null when launch is null', () => {
        const { container } = renderWithProvider(
            <LaunchModal launch={null} isOpen={false} onClose={vi.fn()} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders modal when isOpen is true', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        expect(screen.getByText('Test Mission')).toBeInTheDocument();
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
        expect(screen.getByText('Test mission details')).toBeInTheDocument();
    });

    it('does not render content when isOpen is false', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={false} onClose={onClose} />
        );

        expect(screen.queryByText('Test Mission')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking outside the modal content', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        const backdrop = screen.getByRole('dialog').parentElement;
        if (backdrop) {
            fireEvent.click(backdrop);
            expect(onClose).toHaveBeenCalledTimes(1);
        }
    });

    it('does not call onClose when clicking inside modal content', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        const modalContent = screen.getByText('Test Mission').closest('div');
        if (modalContent) {
            fireEvent.click(modalContent);
            expect(onClose).not.toHaveBeenCalled();
        }
    });

    it('renders mission patch image', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        const image = screen.getByAltText('Test Mission patch');
        expect(image).toBeInTheDocument();
    });

    it('renders launch site information', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        expect(screen.getByText('Cape Canaveral Air Force Station')).toBeInTheDocument();
    });

    it('handles Escape key press', () => {
        const onClose = vi.fn();
        renderWithProvider(
            <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
        );

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});