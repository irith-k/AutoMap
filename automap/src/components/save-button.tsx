import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu" 
import domtoimage from "dom-to-image";

const SaveButton = () => {
    const saveAsPng = async () => {
        const element = document.querySelector(".react-flow__viewport");
        if(!element) return;
        domtoimage.toPng(element)
        .then((dataUrl: string) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "mindmap.png";
            link.click();
        });

    };

    const saveAsJpeg = async () => {
        const element = document.querySelector(".react-flow__viewport");
        if(!element) return;
        domtoimage.toJpeg(element)
        .then((dataUrl: string) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "mindmap.jpeg";
            link.click();
        });

    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-black hover:bg-blue-600 text-white transition-all h-9 px-4 py-2 m-1 rounded-md text-sm font-medium outline-none shadow-none ">Save</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={saveAsPng}>Save as PNG</DropdownMenuItem>
                <DropdownMenuItem onClick={saveAsJpeg}>Save as JPEG</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SaveButton;