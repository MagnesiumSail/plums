"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/topics", label: "Content" },
        { href: "/topics/add", label: "Add New" },
        { href: "/page3", label: "Page3" },
        { href: "/page4", label: "Page4" },
    ];

    const handleSignOut = () => {
        localStorage.removeItem('loggedIn');
        signOut({ callbackUrl: '/' });
      };

    return (
        <nav className="bg-purple-500 p-5 flex items-center justify-between">
            <div className="flex items-center">
            <Link href="/" legacyBehavior>
                    <a>
                        <Image src="/images/plums-logo.webp" alt="Logo" width={100} height={100} className="rounded-full" />
                    </a>
                </Link>
                <button 
                    className="text-white lg:hidden text-2xl" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>
            <ul className={`lg:flex justify-end p-5 gap-5 text-white items-center ${isOpen ? 'block' : 'hidden'}`}>
                {navItems.map((item, index) => (
                    <li key={index} className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>
                        <Link href={item.href} className="p-5">{item.label}</Link>
                    </li>
                ))}
                {!status.loading && session && (
                    <li className={`hover:text-black hover:border-black p-2 ${isOpen ? 'border-b-2 text-center mb-2 border-2 w-1/3 mx-auto' : 'border-2'}`}>
                        <h1 className='flex items-center'><button onClick={handleSignOut} className="text-inherit">Sign Out</button> : <span className="ml-2 text-inherit">{session?.user?.name}</span></h1>
                    </li>
                )}
            </ul>
        </nav>
    );
}



