"use client";

import Image from 'next/image';
import html2canvas from "html2canvas";

const saveMap = () => {
    
};
  
const Header = ({ mindMapRef }: { mindMapRef: React.RefObject<HTMLDivElement | null> }) => {
    const save = async () => {
        var fname = "mindmap";
        var imgExt = "png";
        if (mindMapRef.current) {
            const canvas = await html2canvas(mindMapRef.current);
            const imgData = canvas.toDataURL("image/"+imgExt);
            const link = document.createElement("a");
            link.href = imgData;
            link.download = fname+'.'+imgExt;
            link.click();
        }
    };

    return (
        <header className="bg-blue-200 text-black py-3 px-6 flex justify-between items-center">
            <div className="flex-1 text-center text-2xl font-bold">AutoMap</div>
            <button className="text-black px-4 py-2 rounded-lg bg-blue-200 hover:bg-blue-300 aashadow-md" onClick={save}>
                <Image src="/save-icon.png" alt="Save" width={25} height={25} />
            </button>
        </header>
    );
}

export default Header;