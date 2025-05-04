import React from "react";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow, useStore } from "@xyflow/react";

const MAX_ZOOM = 2; // or whatever your max zoom is

const ZoomInButton = () => {
    const { zoomIn, getZoom } = useReactFlow();

    // Subscribe to zoom level changes
    const currentZoom = useStore((state) => state.transform[2]);
    const isMaxZoom = currentZoom >= MAX_ZOOM;

    return (
        <Button
            onClick={() => zoomIn({ duration: 300 })}
            disabled={isMaxZoom}
            className="bg-black hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium"
        >
            <ZoomIn size={15} />
        </Button>
    );
};

export default ZoomInButton;
