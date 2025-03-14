import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"  
import {
    useReactFlow,
  } from '@xyflow/react';

const ClearButton = () => {
    const { setNodes, setEdges } = useReactFlow();
    const clear = () => {
        setNodes([]);
        setEdges([]);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white rounded-md text-sm font-medium outline-none shadow-none">Clear</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. Your mind map will be permanently deleted.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clear}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default ClearButton;
