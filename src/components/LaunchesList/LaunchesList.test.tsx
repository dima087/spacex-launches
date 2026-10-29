import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi } from 'vitest';
import { LaunchesList } from './LaunchesList';
import { Launch } from '../../types';

const mockLaunches: Launch[] = [
    {
        flight_number: 1,
        mission_name: 'Mission 1',
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
            first_stage: { cores: [] },
            second_stage: { block: 1, payloads: [] },
            fairings: null
        },
        ships: [],
        telemetry: { flight_club: null },
        launch_site: {
            site_id: 'test',
            site_name: 'Test',
            site_name_long: 'Test Site'
        },
        launch_success: true,
        launch_failure_details: null,
        links: {
            mission_patch: 'https://example.com/patch1.png',
            mission_patch_small: 'https://example.com/patch1_small.png',
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
        details: 'Details 1',
        static_fire_date_utc: null,
        static_fire_date_unix: null,
        timeline: {}
    },
    {
        flight_number: 2,
        mission_name: 'Mission 2',
        mission_id: [],
        upcoming: false,
        launch_year: '2020',
        launch_date_unix: 1234567891,
        launch_date_utc: '2020-01-02T00:00:00.000Z',
        launch_date_local: '2020-01-02T00:00:00+00:00',
        is_tentative: false,
        tentative_max_precision: 'hour',
        tbd: false,
        launch_window: 0,
        rocket: {
            rocket_id: 'falcon9',
            rocket_name: 'Falcon 9',
            rocket_type: 'v1.0',
            first_stage: { cores: [] },
            second_stage: { block: 1, payloads: [] },
            fairings: null
        },
        ships: [],
        telemetry: { flight_club: null },
        launch_site: {
            site_id: 'test',
            site_name: 'Test',
            site_name_long: 'Test Site'
        },
        launch_success: true,
        launch_failure_details: null,
        links: {
            mission_patch: 'https://example.com/patch2.png',
            mission_patch_small: 'https://example.com/patch2_small.png',
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
        details: 'Details 2',
        static_fire_date_utc: null,
        static_fire_date_unix: null,
        timeline: {}
    }
];

const renderWithProvider = (component: React.ReactElement) => {
    return render(
        <MantineProvider>
            {component}
        </MantineProvider>
    );
};

describe('LaunchesList', () => {
    it('renders loading state', () => {
        renderWithProvider(
            <LaunchesList
                launches={[]}
                selectedLaunch={null}
                isModalOpen={false}
                loading={true}
                error={null}
                onSeeMore={vi.fn()}
                onCloseModal={vi.fn()}
            />
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders error state', () => {
        renderWithProvider(
            <LaunchesList
                launches={[]}
                selectedLaunch={null}
                isModalOpen={false}
                loading={false}
                error="Failed to fetch"
                onSeeMore={vi.fn()}
                onCloseModal={vi.fn()}
            />
        );

        expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });

    it('renders empty state', () => {
        renderWithProvider(
            <LaunchesList
                launches={[]}
                selectedLaunch={null}
                isModalOpen={false}
                loading={false}
                error={null}
                onSeeMore={vi.fn()}
                onCloseModal={vi.fn()}
            />
        );

        expect(screen.getByText('No launches found')).toBeInTheDocument();
    });

    it('renders launches grid', () => {
        renderWithProvider(
            <LaunchesList
                launches={mockLaunches}
                selectedLaunch={null}
                isModalOpen={false}
                loading={false}
                error={null}
                onSeeMore={vi.fn()}
                onCloseModal={vi.fn()}
            />
        );

        expect(screen.getByText('Mission 1')).toBeInTheDocument();
        expect(screen.getByText('Mission 2')).toBeInTheDocument();
    });

    it('renders correct number of cards', () => {
        renderWithProvider(
            <LaunchesList
                launches={mockLaunches}
                selectedLaunch={null}
                isModalOpen={false}
                loading={false}
                error={null}
                onSeeMore={vi.fn()}
                onCloseModal={vi.fn()}
            />
        );

        const seeMoreButtons = screen.getAllByText('See more');
        expect(seeMoreButtons).toHaveLength(2);
    });
});