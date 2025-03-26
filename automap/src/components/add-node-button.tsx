import React, { useState } from "react";
import { useNewNodeStore } from './store'
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    useReactFlow,
    useStoreApi,
} from '@xyflow/react';

const AddNodeButton = () => {
    const { setNodes, getNodes, addNodes, screenToFlowPosition } = useReactFlow();
    const store = useStoreApi();
    const openDialog = useNewNodeStore((state) => state.openDialog);
    const setOpenDialog = useNewNodeStore((state) => state.setOpenDialog);
    const newNodeLabel = useNewNodeStore((state) => state.newNodeLabel);
    const setNewNodeLabel = useNewNodeStore((state) => state.setNewNodeLabel);
    const newNodePosition = useNewNodeStore((state) => state.newNodePosition);
    const setNewNodePosition = useNewNodeStore((state) => state.setNewNodePosition);

    const addNewNode = () => {
        var id = 1;
        if(getNodes().length > 0) {
            id = Number(getNodes().at(-1)?.id)+1;
        }
        if(newNodeLabel.trim()) {
            let position = newNodePosition;
            if(!position) {
                const { domNode } = store.getState();
                const boundingRect = domNode?.getBoundingClientRect();
                if(boundingRect) {
                    position = screenToFlowPosition({
                        x: boundingRect.x + boundingRect.width/2,
                        y: boundingRect.y + boundingRect.height/2,
                    });
                } else {
                    position = {
                        x: 0,
                        y: 0,
                    }
                }
            }
            const newNode = { id: `${id}`, type: 'mindMapNode', position: { x: position.x, y: position.y }, data: { label: newNodeLabel } };
            addNodes([newNode]);
            setNodes((nodes) =>
                nodes.map((node) =>
                    (node.id === `${id}` && node.measured && node.measured.width && node.measured.height) ? { ...node, position: { x: position.x - node.measured.width/2, y: position.y - node.measured.height/2 } } : node
                )
            );
            setNewNodePosition(null);
            setOpenDialog(false);
        }
        setNewNodeLabel("");
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
            <Button className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
                <Plus size={15} />
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New node</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input 
                            className="col-span-4" 
                            placeholder="Enter node label..." 
                            value={newNodeLabel} 
                            onChange={(e) => setNewNodeLabel(e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addNewNode();
                                }
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={addNewNode} disabled={!newNodeLabel.trim()} className="bg-black hover:bg-blue-600 transition-all text-white">Add node</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default AddNodeButton;