import React from "react";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    useReactFlow,
} from '@xyflow/react';

const ZoomInButton = () => {

    const { zoomIn } = useReactFlow();

    return (
        <Button onClick={() => zoomIn({ duration: 300})} className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
            <ZoomIn size={15} />
        </Button>
    );
}
export default ZoomInButton;