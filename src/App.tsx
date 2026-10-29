import { MantineProvider, Container, Title } from '@mantine/core';
import { LaunchesList } from './components/LaunchesList';
import { useLaunches } from './hooks/useLaunches';

function App() {
    const {
        launches,
        selectedLaunch,
        isModalOpen,
        loading,
        error,
        openModal,
        closeModal,
    } = useLaunches();

    return (
        <MantineProvider>
            <Container size="xl" py="xl">
                <Title ta="center" mb="xl">
                    SpaceX Launches 2020
                </Title>

                <LaunchesList
                    launches={launches}
                    selectedLaunch={selectedLaunch}
                    isModalOpen={isModalOpen}
                    loading={loading}
                    error={error}
                    onSeeMore={openModal}
                    onCloseModal={closeModal}
                />
            </Container>
        </MantineProvider>
    );
}

export default App;