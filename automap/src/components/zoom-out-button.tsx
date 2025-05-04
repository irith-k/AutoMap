import React from "react";
import { ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow, useStore } from '@xyflow/react';

const MIN_ZOOM = 0.5; // Adjust to your minimum allowed zoom level

const ZoomOutButton = () => {
    const { zoomOut } = useReactFlow();

    // Read current zoom level from transform
    const currentZoom = useStore((state) => state.transform[2]);
    const isMinZoom = currentZoom <= MIN_ZOOM;

    return (
        <Button
            onClick={() => zoomOut({ duration: 300 })}
            disabled={isMinZoom}
            className="bg-black hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium"
        >
            <ZoomOut size={15} />
        </Button>
    );
};

export default ZoomOutButton;
