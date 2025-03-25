import { Download } from "lucide-react";
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
import jsPDF from 'jspdf';

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

    const saveAsPdf = async () => {
        const element = document.querySelector(".react-flow__viewport");
        if(!element) return;
        domtoimage.toPng(element)
        .then((dataUrl: string) => {
            const pdf = new jsPDF({
                orientation: 'landscape',
                format: [element.clientWidth, element.clientHeight]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, element.clientWidth, element.clientHeight);
            pdf.save("mindmap.pdf");
        });

    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-black hover:bg-blue-600 text-white transition-all h-9 px-4 py-2 m-1 rounded-md text-sm font-medium outline-none shadow-none ">
                <Download size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={saveAsPng}>Save as PNG</DropdownMenuItem>
                <DropdownMenuItem onClick={saveAsPdf}>Save as PDF</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SaveButton;