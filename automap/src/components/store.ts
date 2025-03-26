import { create } from 'zustand'

interface NewNodeStore {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    newNodeLabel: string;
    setNewNodeLabel: (label: string) => void;
    newNodePosition: { x: number; y: number } | null;
    setNewNodePosition: (position: { x: number; y: number } | null) => void;
}

export const useNewNodeStore = create<NewNodeStore>((set) => ({
    openDialog: false,
    setOpenDialog: (open) => set({ openDialog: open }),
    newNodeLabel: "",
    setNewNodeLabel: (label) => set({ newNodeLabel: label }),
    newNodePosition: null,
    setNewNodePosition: (position) => set({ newNodePosition: position }),
}));