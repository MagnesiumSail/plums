"use client";

import React, { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-purple-500 p-5">
            <div className="flex justify-between items-center">
                <div className="text-white">Logo</div>
                <button 
                    className="text-white lg:hidden text-2xl" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>
            <ul className={`lg:flex justify-around p-5 text-white ${isOpen ? 'block' : 'hidden'}`}>
                <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>Home</li>
                <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>Page1</li>
                <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>Page2</li>
                <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>Page3</li>
                <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>Page4</li>
            </ul>
        </nav>
    );
}
