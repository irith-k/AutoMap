"use client";

import SaveButton from './save-button';
import FitButton from './fit-button';
import ClearButton from './clear-button';

const Header = () => {
    return (
        <header className="bg-blue-200 text-black py-3 px-6 flex justify-between items-center">
            <div className="flex-1 text-center text-2xl font-bold cursor-default">AutoMap</div>
            <FitButton></FitButton>
            <ClearButton></ClearButton>
            <SaveButton></SaveButton>
        </header>
    );
}

export default Header;