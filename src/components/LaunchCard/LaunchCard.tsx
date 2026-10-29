import { Card, Image, Text, Button, Group } from '@mantine/core';
import type { Launch } from '../../types/launch';

interface LaunchCardProps {
    launch: Launch;
    onSeeMore: (launch: Launch) => void;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch, onSeeMore }) => {
    const patchImage = launch.links?.mission_patch_small || launch.links?.mission_patch;

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Card.Section>
                {patchImage ? (
                    <Image
                        src={patchImage}
                        alt={`${launch.mission_name} patch`}
                        h={200}
                        fit="contain"
                        mx="auto"
                    />
                ) : (
                    <div style={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f8f9fa'
                    }}>
                        <Text c="dimmed">No image available</Text>
                    </div>
                )}
            </Card.Section>

            <Group justify="center" mt="md" mb="xs">
                <Text fw={500} size="lg" ta="center">
                    {launch.mission_name}
                </Text>
            </Group>

            <Text c="dimmed" size="sm" ta="center" mb="md">
                {launch.rocket?.rocket_name}
            </Text>

            <Button
                variant="light"
                color="blue"
                fullWidth
                onClick={() => onSeeMore(launch)}
            >
                See more
            </Button>
        </Card>
    );
};