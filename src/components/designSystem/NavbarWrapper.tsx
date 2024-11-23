"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/designSystem/navigation/navbar';

const NavbarWrapper = (): React.JSX.Element | null => {
    const pathname = usePathname();

    // Ne pas afficher la navbar si l'URL est "/aide"
    if (pathname === '/aide') {
        return null;
    }

    return <Navbar />;
};

export default NavbarWrapper;
