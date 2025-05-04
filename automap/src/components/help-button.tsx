import React from "react";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const HelpButton = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
                <CircleHelp size={15} />
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Help</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-muted-foreground space-y-2">
            <div>
                <b>Adding a Node</b>
                <div className="pl-4">Click the "+" button or double click anywhere on the canvas to add a new node.</div>
            </div>

            <div>
                <b>Editing Node</b>
                <div className="pl-4">Double click on the node to edit the label.</div>
                <div className="pl-4">Click out of the node to save the changes.</div>
            </div>

            <div>
                <b>Deleting a Node / Edge</b>
                <div className="pl-4">Select the node / edge and press the delete button on your keyboard.</div>
            </div>

            <div>
                <b>Moving</b>
                <div className="pl-4">Click and drag the canvas to move around.</div>
            </div>
            </div>

            </DialogContent>
        </Dialog>
    );
}
export default HelpButton;