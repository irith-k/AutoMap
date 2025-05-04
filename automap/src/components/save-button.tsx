import { Download } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
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
import { useState } from "react";
import domtoimage from "dom-to-image";
import jsPDF from 'jspdf';
import { Input } from "@/components/ui/input";

const SaveButton = () => {
    const [fileName, setFileName] = useState("");

    const saveAsPng = async (fileName: string) => {
        const element = document.querySelector(".react-flow__viewport");
        if(!element) return;
        domtoimage.toPng(element)
        .then((dataUrl: string) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = fileName?.trim() ? `${fileName}.png` : "mindmap.png";
            link.click();
        });
        setFileName("");
    };
    const saveAsPdf = async (fileName: string) => {
        const element = document.querySelector(".react-flow__viewport");
        if(!element) return;
        domtoimage.toPng(element)
        .then((dataUrl: string) => {
            const pdf = new jsPDF({
                orientation: 'landscape',
                format: [element.clientWidth, element.clientHeight]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, element.clientWidth, element.clientHeight);
            pdf.save(fileName?.trim() ? `${fileName}.pdf` : "mindmap.pdf");
        });
        setFileName("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button className="bg-black hover:bg-blue-600 transition-all h-9 px-4 py-2 m-1 text-white outline-none shadow-none rounded-md text-sm font-medium">
                <Download size={15} />
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Mind Map</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input 
                            className="col-span-4" 
                            placeholder="Enter file name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)} 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => saveAsPdf(fileName)} disabled={!fileName.trim()} className="bg-black hover:bg-blue-600 transition-all text-white">Save as PDF</Button>
                    <Button type="submit" onClick={() => saveAsPng(fileName)} disabled={!fileName.trim()} className="bg-black hover:bg-blue-600 transition-all text-white">Save as PNG</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default SaveButton;