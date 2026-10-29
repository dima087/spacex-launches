import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    containerId?: string;
}

export const Portal: React.FC<PortalProps> = ({
                                                  children,
                                                  containerId = 'portal-root'
                                              }) => {
    const [mounted, setMounted] = useState(false);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let portalContainer = document.getElementById(containerId);

        if (!portalContainer) {
            portalContainer = document.createElement('div');
            portalContainer.id = containerId;
            document.body.appendChild(portalContainer);
        }

        setContainer(portalContainer);
        setMounted(true);

        return () => {
            if (portalContainer && !portalContainer.children.length) {
                document.body.removeChild(portalContainer);
            }
        };
    }, [containerId]);

    if (!mounted || !container) {
        return null;
    }

    return createPortal(children, container);
};