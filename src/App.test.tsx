import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock fetch
global.fetch = vi.fn();

const mockLaunches = {
    launches: [
        {
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
        }
    ]
};

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
            new Promise(() => {}) // Never resolves
        );

        render(<App />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders launches after successful fetch', async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockLaunches,
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Test Mission')).toBeInTheDocument();
        });
    });

    it('renders error state on fetch failure', async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Error:/)).toBeInTheDocument();
        });
    });

    it('renders page title', async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockLaunches,
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('SpaceX Launches 2020')).toBeInTheDocument();
        });
    });

    it('displays total launches count', async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockLaunches,
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Total launches: 1')).toBeInTheDocument();
        });
    });
});