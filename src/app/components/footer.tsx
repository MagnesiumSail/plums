'use client';

import React, { useEffect } from 'react';

const Footer: React.FC = () => {
    useEffect(() => {
        const currentYearElement = document.getElementById('currentyear');
        const lastModifiedElement = document.getElementById('lastModified');
        
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear().toString();
        }
        
        if (lastModifiedElement) {
            lastModifiedElement.textContent = "Last Modification: " + document.lastModified;
        }
    }, []);

    return (
        <footer className='bg-purple-500 p-2 text-white text-center'>
            <p>&copy;<span id="currentyear"></span> Kordell Farley + Indiana Brown / BYU - Idaho</p>
            <p><span id="lastModified"></span></p>
        </footer>
    );
}

export default Footer;
