import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi } from 'vitest';
import { LaunchCard } from './LaunchCard';
import { Launch } from '../../types';

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
        site_name_long: 'Test Site Long'
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
    details: 'Test details',
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

describe('LaunchCard', () => {
    it('renders mission name and rocket name', () => {
        const onSeeMore = vi.fn();
        renderWithProvider(
            <LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />
        );

        expect(screen.getByText('Test Mission')).toBeInTheDocument();
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });

    it('renders "See more" button', () => {
        const onSeeMore = vi.fn();
        renderWithProvider(
            <LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />
        );

        expect(screen.getByText('See more')).toBeInTheDocument();
    });

    it('calls onSeeMore when button is clicked', () => {
        const onSeeMore = vi.fn();
        renderWithProvider(
            <LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />
        );

        fireEvent.click(screen.getByText('See more'));
        expect(onSeeMore).toHaveBeenCalledWith(mockLaunch);
        expect(onSeeMore).toHaveBeenCalledTimes(1);
    });

    it('renders mission patch image', () => {
        const onSeeMore = vi.fn();
        renderWithProvider(
            <LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />
        );

        const image = screen.getByAltText('Test Mission patch');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/patch_small.png');
    });

    it('renders placeholder when no image is available', () => {
        const launchWithoutImage = {
            ...mockLaunch,
            links: {
                ...mockLaunch.links,
                mission_patch: null,
                mission_patch_small: null
            }
        };

        const onSeeMore = vi.fn();
        renderWithProvider(
            <LaunchCard launch={launchWithoutImage} onSeeMore={onSeeMore} />
        );

        expect(screen.getByText('No image available')).toBeInTheDocument();
    });
});