"use client";

import SaveButton from './save-button';
import FitButton from './fit-button';
import ClearButton from './clear-button';
import ZoomOutButton from './zoom-out-button';
import ZoomInButton from './zoom-in-button';
import AddNodeButton from './add-node-button';
import HelpButton from './help-button';

const Header = () => {
    return (
        <header className="bg-gray-100 text-black py-3 px-3 flex justify-between items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 cursor-default">
                <h1 className="text-2xl font-bold">AutoMap</h1>
            </div>
            <div className='ml-auto flex'>
                <ZoomInButton></ZoomInButton>
                <ZoomOutButton></ZoomOutButton>
                <FitButton></FitButton>
                <AddNodeButton></AddNodeButton>
                <SaveButton></SaveButton>
                <ClearButton></ClearButton>
                <HelpButton></HelpButton>
            </div>
        </header>
    );
}

export default Header;