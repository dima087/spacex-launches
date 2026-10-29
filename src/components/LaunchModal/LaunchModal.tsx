import { useState, useEffect } from 'react';
import { Image, Text, ScrollArea, Box, Center } from '@mantine/core';
import { Portal } from '../Portal';
import type { Launch } from '../../types/launch';

interface LaunchModalProps {
    launch: Launch | null;
    isOpen: boolean;
    onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({
                                                            launch,
                                                            isOpen,
                                                            onClose
                                                        }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!launch) {
        return null;
    }

    const patchImage = launch.links?.mission_patch;

    return (
        <Portal>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: isOpen ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}
                onClick={onClose}
            >
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >

                    <div
                        style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid #e9ecef',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Text id="modal-title" fw={500} size="lg">
                            {launch.mission_name}
                        </Text>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '28px',
                                cursor: 'pointer',
                                color: '#868e96',
                                padding: '0 4px',
                                lineHeight: 1,
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                            }}
                            aria-label="Close modal"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor = '#f8f9fa';
                                (e.currentTarget as HTMLElement).style.color = '#495057';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = '#868e96';
                            }}
                        >
                            ×
                        </button>
                    </div>

                    <ScrollArea
                        style={{ flex: 1, overflow: 'hidden' }}
                        offsetScrollbars
                        type="hover"
                    >
                        <div style={{ padding: '20px' }}>
                            {/* Mission Patch - Circular */}
                            <Center mb="xl">
                                {patchImage && !imageError ? (
                                    <div
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '4px solid #1971c2',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Image
                                            src={patchImage}
                                            alt={`${launch.mission_name} patch`}
                                            fit="contain"
                                            w="100%"
                                            h="100%"
                                            onError={() => setImageError(true)}
                                        />
                                    </div>
                                ) : (
                                    <Box
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            border: '4px solid #1971c2',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#f8f9fa',
                                            color: '#868e96',
                                        }}
                                    >
                                        <span style={{ fontSize: 60 }}>🚀</span>
                                        <Text size="sm" mt="sm">Mission Patch</Text>
                                    </Box>
                                )}
                            </Center>

                            <Text fw={600} mb="xs" size="md">
                                Rocket:
                            </Text>
                            <Text c="dimmed" mb="xl" size="sm">
                                {launch.rocket?.rocket_name}
                            </Text>

                            {launch.details && (
                                <>
                                    <Text fw={600} mb="xs" size="md">
                                        Details:
                                    </Text>
                                    <Text
                                        c="dimmed"
                                        mb="xl"
                                        size="sm"
                                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                                    >
                                        {launch.details}
                                    </Text>
                                </>
                            )}

                            <Text fw={600} mb="xs" size="md">
                                Launch Date:
                            </Text>
                            <Text c="dimmed" mb="xl" size="sm">
                                {new Date(launch.launch_date_utc).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>

                            {/* Launch Site */}
                            <Text fw={600} mb="xs" size="md">
                                Launch Site:
                            </Text>
                            <Text c="dimmed" mb="xl" size="sm">
                                {launch.launch_site?.site_name_long}
                            </Text>

                            {/* Launch Success */}
                            <Text fw={600} mb="xs" size="md">
                                Status:
                            </Text>
                            <Text
                                c={launch.launch_success ? 'teal' : 'red'}
                                fw={500}
                                size="sm"
                            >
                                {launch.launch_success ? '✅ Success' : '❌ Failure'}
                            </Text>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Portal>
    );
};