import { SimpleGrid, Text, Loader, Center } from '@mantine/core';
import { LaunchCard } from '../LaunchCard';
import { LaunchModal } from '../LaunchModal';
import type { Launch } from '../../types/launch';

interface LaunchesListProps {
    launches: Launch[];
    selectedLaunch: Launch | null;
    isModalOpen: boolean;
    loading: boolean;
    error: string | null;
    onSeeMore: (launch: Launch) => void;
    onCloseModal: () => void;
}

export const LaunchesList: React.FC<LaunchesListProps> = ({
                                                              launches,
                                                              selectedLaunch,
                                                              isModalOpen,
                                                              loading,
                                                              error,
                                                              onSeeMore,
                                                              onCloseModal,
                                                          }) => {
    if (loading) {
        return (
            <Center style={{ height: '400px' }}>
                <Loader size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center style={{ height: '400px' }}>
                <Text c="red" size="lg">
                    Error: {error}
                </Text>
            </Center>
        );
    }

    if (launches.length === 0) {
        return (
            <Center style={{ height: '400px' }}>
                <Text c="dimmed" size="lg">
                    No launches found
                </Text>
            </Center>
        );
    }

    return (
        <>
            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing="md"
                verticalSpacing="md"
            >
                {launches.map((launch) => (
                    <LaunchCard
                        key={launch.flight_number}
                        launch={launch}
                        onSeeMore={onSeeMore}
                    />
                ))}
            </SimpleGrid>

            <LaunchModal
                launch={selectedLaunch}
                isOpen={isModalOpen}
                onClose={onCloseModal}
            />
        </>
    );
};