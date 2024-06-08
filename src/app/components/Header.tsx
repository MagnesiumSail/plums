"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/topics", label: "Topics" },
        { href: "/page2", label: "Page2" },
        { href: "/page3", label: "Page3" },
        { href: "/page4", label: "Page4" },
    ];

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
                {navItems.map((item, index) => (
                    <li key={index} className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
                {!loading && session && (
                    <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="text-white">
                            Sign Out
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
