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
                <DialogDescription>
                    Double click to add a node. Delete button to delete a node.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
export default HelpButton;