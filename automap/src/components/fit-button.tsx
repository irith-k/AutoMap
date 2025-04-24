import React from "react";
import { Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import {
    useReactFlow,
} from '@xyflow/react';
import { layout } from "./layout";

const FitButton = () => {
    const { getEdges, setNodes, fitView } = useReactFlow();

    const fit = () => {
        fitView({ padding: 0.1, duration: 500 });
    };

    const fitLayout = () => {
        layout(getEdges, setNodes, fitView);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-black hover:bg-blue-600 text-white transition-all h-9 px-4 py-2 m-1 rounded-md text-sm font-medium outline-none shadow-none ">
                <Waypoints size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={fit}>Center map</DropdownMenuItem>
                <DropdownMenuItem onClick={fitLayout}>Layout map</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default FitButton;
