import React from "react";
import { ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    useReactFlow,
} from '@xyflow/react';

const ZoomOutButton = () => {

    const { zoomOut } = useReactFlow();

    return (
        <Button onClick={() => zoomOut({ duration: 300})} className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
            <ZoomOut size={15} />
        </Button>
    );
}
export default ZoomOutButton;