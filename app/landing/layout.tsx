'use client';

import {
    ArrowLeft, ChevronDown, ChevronUp,
    Facebook,
    Globe, Menu, MonitorCog, Moon, Sun, Twitter, User,
    Youtube
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'Light' | 'Dark' | 'System'>('System');
    const [language, setLanguage] = useState<'EN' | 'ID'>('EN');
    const [isLangOpen, setLangOpen] = useState(false);
    const [isModeOpen, setModeOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLElement | null>(null);
    const langRef = useRef<HTMLDivElement | null>(null);
    const modeRef = useRef<HTMLDivElement | null>(null);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setLangOpen(false);
                setModeOpen(false);
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect system dark mode
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = () => {
            if (mode === 'System') {
                if (mediaQuery.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        handleSystemChange();
        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, [mode]);

    // Update HTML class for dark/light
    useEffect(() => {
        if (mode === 'Dark') {
            document.documentElement.classList.add('dark');
        } else if (mode === 'Light') {
            document.documentElement.classList.remove('dark');
        } else {
            // default
        }
    }, [mode]);

    // Handle click outside for menus
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // if (
            //     langRef.current && !langRef.current.contains(event.target as Node)
            // ) {
            //     setLangOpen(false);
            // }
            
            // if (
            //     modeRef.current && !modeRef.current.contains(event.target as Node)
            // ) {
            //     setModeOpen(false);
            // }
            
            if (
                sidebarRef.current && !sidebarRef.current.contains(event.target as Node)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="dark:bg-eerie-black bg-white px-6 py-3 flex justify-between items-center border-b border-gray-800 fixed w-full z-50">
                {/* Mobile Mode */}
                <div className="md:hidden flex ">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                        <Menu />
                    </button>

                    <aside
                        ref={sidebarRef}
                        className={`fixed top-0 left-0 h-full w-64 dark:bg-eerie-black bg-white border-r border-gray-800 p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
                    >
                        <button className="md:hidden p-2 text-white" onClick={() => setSidebarOpen(false)}>
                            <ArrowLeft size={18} />
                        </button>
                        <ul className="space-y-4">
                            <li><Link href="" className="dark:hover:text-gray-400 hover:text-gray-600">Browse</Link></li>
                            <li><Link href="" className="dark:hover:text-gray-400 hover:text-gray-600">News</Link></li>
                            <li><Link href="" className="dark:hover:text-gray-400 hover:text-gray-600">About</Link></li>
                        </ul>

                        {/* Mode Selector */}
                        <div className="relative">
                            <button onClick={() => setModeOpen(!isModeOpen)} className="flex items-center justify-between w-full hover:text-gray-400">
                                <span className="flex items-center gap-1"><MonitorCog size={18} />{mode}</span>
                                {!isModeOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                            </button>
                            {isModeOpen && (
                                <div
                                    className="mt-2 dark:bg-eerie-black bg-white rounded-lg shadow-lg py-2 w-full z-10">
                                    <button onClick={() => setMode('Dark')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><Moon size={12} />Dark</button>
                                    <button onClick={() => setMode('Light')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><Sun size={12} />Light</button>
                                    <button onClick={() => setMode('System')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><MonitorCog size={12} />System</button>
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative">
                            <button onClick={() => setLangOpen(!isLangOpen)} className="flex items-center justify-between w-full hover:text-gray-400">
                                <span className="flex items-center gap-1"><Globe size={18} />{language}</span>
                                <ChevronDown size={16} />
                            </button>
                            {isLangOpen && (
                                <div
                                    className="mt-2 dark:bg-eerie-black rounded-lg shadow-lg py-2 w-full z-10">
                                    <button onClick={() => setLanguage('EN')} className="px-4 py-2 hover:bg-gray-700 w-full">EN</button>
                                    <button onClick={() => setLanguage('ID')} className="px-4 py-2 hover:bg-gray-700 w-full">ID</button>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-black">G</span>
                    </div>
                    <span className="text-lg font-semibold">Play Portal</span>
                </div>

                {/* Nav Links Desktop */}
                <div className="md:flex relative hidden">
                    <div className="flex space-x-6">
                        <Link href="/auth/sign-in" className="dark:hover:text-gray-400">Browse</Link>
                        <Link href="/auth/sign-in" className="dark:hover:text-gray-400">News</Link>
                        <Link href="/auth/sign-in" className="dark:hover:text-gray-400">About</Link>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-10">
                    {/* Mode Desktop */}
                    <div className="relative hidden md:block">
                        <button onClick={() => setModeOpen(!isModeOpen)} className="flex items-center space-x-1 hover:text-gray-400">
                            <MonitorCog size={18} /><span>{mode}</span><ChevronDown size={16} />
                        </button>
                        {isModeOpen && (
                            <div ref={modeRef} className="absolute dark:bg-eerie-black bg-white mt-4 rounded-lg shadow-lg py-2 w-28 z-10">
                                <button onClick={() => setMode('Dark')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><Moon size={12} />Dark</button>
                                <button onClick={() => setMode('Light')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><Sun size={12} />Light</button>
                                <button onClick={() => setMode('System')} className="flex items-center gap-1 px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full"><MonitorCog size={12} />System</button>
                            </div>
                        )}
                    </div>

                    {/* Language Desktop */}
                    <div className="relative hidden md:block">
                        <button onClick={() => setLangOpen(!isLangOpen)} className="flex items-center space-x-1 hover:text-gray-400">
                            <Globe size={18} /><span>{language}</span><ChevronDown size={16} />
                        </button>
                        {isLangOpen && (
                            <div ref={langRef} className="absolute dark:bg-eerie-black bg-white mt-4 rounded-lg shadow-lg py-2 w-20 z-10">
                                <button onClick={() => setLanguage('EN')} className="block px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full">EN</button>
                                <button onClick={() => setLanguage('ID')} className="block px-4 py-2 dark:hover:bg-gray-700 hover:bg-slate-300 w-full">ID</button>
                            </div>
                        )}
                    </div>

                    {/* User Icon */}
                    <User size={20} className="hover:text-gray-400 cursor-pointer" />
                </div>
            </nav>

            <main className="pt-12">{children}</main>
            <footer className="bg-white dark:bg-eerie-black text-[#111827] dark:text-white px-6 pt-6 pb-10 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-black">G</span>
                    </div>
                    <span className="text-lg font-semibold">Play Portal</span>
                </div>
                <div className="border-b mb-5 pb-2 border-[#374151] flex flex-col sm:flex-row justify-between items-center text-black dark:text-white"></div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
                    {/* Column 1 */}
                    <div>
                        <h3 className="font-semibold mb-4">Game</h3>
                        <ul className="space-y-2 text-black dark:text-white">
                            <li>Sky Children of the Light</li>
                            <li>A Space for the Unbound</li>
                            <li>R.E.P.O</li>
                            <li>Ranch Simulator</li>
                            <li>Black Myth : Wukong</li>
                            <li>Schedule I</li>
                            <li>The Journalist</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-semibold mb-4">Marketplace</h3>
                        <ul className="space-y-2 text-black dark:text-white">
                            <li>Game Vault Store</li>
                            <li>FAB</li>
                            <li>Sketchfab</li>
                            <li>ArtStation</li>
                            <li>Store Refund Policy</li>
                            <li>Store EULA</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-semibold mb-4">Tools</h3>
                        <ul className="space-y-2 text-black dark:text-white">
                            <li>Unreal Engine</li>
                            <li>UEFN</li>
                            <li>Meta Human</li>
                            <li>Twimotion</li>
                            <li>Megascans</li>
                            <li>Reality Scan</li>
                            <li>Rad Game Tools</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-b mb-2 pb-6 border-[#374151] flex flex-col sm:flex-row justify-between items-center text-black dark:text-[#9CA3AF]">
                    <div className="flex space-x-4 mb-4 sm:mb-0">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Legal</a>
                        <a href="#">Support</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#"><i className="fab fa-facebook"><Facebook /></i></a>
                        <a href="#"><i className="fab fa-twitter"><Twitter /></i></a>
                        <a href="#"><i className="fab fa-youtube"><Youtube /></i></a>
                    </div>
                </div>
                <p className="text-xs text-center  max-w-full dark:text-[#9CA3AF] text-black">
                    © 2025 Valve Corporation. All rights reserved.
                </p>
            </footer>
        </>
    );
}