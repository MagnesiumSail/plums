'use client';

import React, { useEffect } from 'react';

export default function Footer() {
    useEffect(() => {
        document.getElementById('currentyear').textContent = new Date().getFullYear();
        document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;
    }, []);

    return (
        <footer className='bg-purple-500 p-2 text-white text-center'>
            <p>&copy;<span id="currentyear"></span> Kordell Farley + Indiana Brown / BYU - Idaho</p>
            <p><span id="lastModified"></span></p>
        </footer>
    );
}