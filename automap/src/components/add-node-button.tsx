import React, { useState } from "react";
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

    const [nodeLabel, setNodeLabel] = useState("");
    const { setNodes, getNodes, addNodes, screenToFlowPosition } = useReactFlow();
    const store = useStoreApi();

    const addNewNode = () => {
        var id = 1;
        if(getNodes().length > 0) {
            id = Number(getNodes().at(-1)?.id)+1;
        }
        if(nodeLabel.trim()) {
            const { domNode } = store.getState();
            const boundingRect = domNode?.getBoundingClientRect();
            if(boundingRect) {
                const center = screenToFlowPosition({
                    x: boundingRect.x + boundingRect.width/2,
                    y: boundingRect.y + boundingRect.height/2,
                });
                const newNode = { id: `${id}`, type: 'mindMapNode', position: { x: center.x, y: center.y }, data: { label: nodeLabel } };
                addNodes([newNode]);
                setNodes((nodes) =>
                    nodes.map((node) =>
                        (node.id === `${id}` && node.measured && node.measured.width && node.measured.height) ? { ...node, position: { x: center.x - node.measured.width/2, y: center.y - node.measured.height/2 } } : node
                    )
                );
            }
            setNodeLabel("");
        }
    };

    return (
        <Dialog>
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
                        <Input className="col-span-4" placeholder="Enter node label..." value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={addNewNode} className="bg-black hover:bg-blue-600 transition-all text-white">Add node</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default AddNodeButton;