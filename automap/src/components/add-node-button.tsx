import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddNodeButton = () => {

    return (
        <Button className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
            <Plus size={15} />
        </Button>
    );
}
export default AddNodeButton;