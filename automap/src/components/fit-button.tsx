import React from "react";
import { Crosshair } from "lucide-react";
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


const FitButton = () => {
    const { fitView } = useReactFlow();
    const fit = () => {
        fitView({ padding: 0.2, duration: 500 });
    };
    
    const layout = () => {

    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-black hover:bg-blue-600 text-white transition-all h-9 px-4 py-2 m-1 rounded-md text-sm font-medium outline-none shadow-none ">
                <Crosshair size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={fit}>Center map</DropdownMenuItem>
                <DropdownMenuItem onClick={layout}>Layout map</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default FitButton;
