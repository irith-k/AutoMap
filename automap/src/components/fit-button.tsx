import React from "react";
import { Button } from "@/components/ui/button";
import {
    useReactFlow,
  } from '@xyflow/react';


const FitButton = () => {
    const { fitView } = useReactFlow();
    const fit = () => {
        fitView({ padding: 0.2 });
    };

    return (
        <Button className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium" onClick={fit}>Fit</Button>
    );
}
export default FitButton;
