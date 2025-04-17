'use client'

import { ArrowLeft, BackpackIcon, ChevronDown, ChevronUp, Globe, Menu, MonitorCog, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Home from "../../canceled/page";
import { kMaxLength } from "buffer";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'Light' | 'Dark' | 'System'>('System');
    const [language, setLanguage] = useState<'EN' | 'ID'>('EN');
    const [isLangOpen, setLangOpen] = useState(false);
    const [isModeOpen, setModeOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLElement | null>(null);



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setLangOpen(false);
                setModeOpen(false);
                setSidebarOpen(false);
            };
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className={`min-h-screen ${mode === 'Dark' ? 'bg-black text-white' : mode === 'Light' ? 'bg-white text-black' : 'bg-neutral-900 text-white'}`}>
            <nav className="bg-[#0a0c10] px-6 py-3 flex justify-between items-center border-b border-gray-800 fixed w-full">
                <div className=" md:hidden flex bg-[#0a0c10] text-white">
                    {/* Mobile toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        <Menu />
                    </button>

                    {/* Sidebar */}
                    <aside
                        ref={sidebarRef}
                        className={`fixed top-0 left-0 h-full w-64 bg-[#0a0c10] border-r border-gray-800 p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
                    >
                        <button
                            className="md:hidden p-2 text-white"
                            onClick={() => setSidebarOpen(false)}>
                            <ArrowLeft size={18} />
                        </button>
                        <div className="space-y-4">
                            <h1><Link href="" className="block hover:text-gray-400">Games</Link></h1>
                            <h1><Link href="" className="block hover:text-gray-400">News</Link></h1>
                            <h1><Link href="" className="block hover:text-gray-400">About</Link></h1>
                        </div>

                        {/* Mode Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setModeOpen(!isModeOpen)}
                                className="flex items-center justify-between w-full hover:text-gray-400"
                            >
                                <span className="flex items-center gap-1">
                                    <MonitorCog size={18} />
                                    {mode}
                                </span>
                                {!isModeOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                            </button>
                            {isModeOpen && (
                                <div className="mt-2 bg-gray-900 rounded-lg shadow-lg py-2 w-full z-10 ">
                                    <button onClick={() => setMode('Dark')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><Moon size={12} />Dark</button>
                                    <button onClick={() => setMode('Light')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><Sun size={12} />Light</button>
                                    <button onClick={() => setMode('System')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><MonitorCog size={12} />System</button>
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!isLangOpen)}
                                className="flex items-center justify-between w-full hover:text-gray-400"
                            >
                                <span className="flex items-center gap-1">
                                    <Globe size={18} />
                                    {language}
                                </span>
                                <ChevronDown size={16} />
                            </button>
                            {isLangOpen && (
                                <div className="mt-2 bg-gray-900 rounded-lg shadow-lg py-2 w-full z-10">
                                    <button onClick={() => setLanguage('EN')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full">EN</button>
                                    <button onClick={() => setLanguage('ID')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full">ID</button>
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
                    <span className="text-lg font-semibold">GamerVault</span>
                </div>

                {/* Nav Links */}
                <div className="md:flex relative block max-md:hidden">
                    <div className="md:flex max-md:space-y-1 md:space-x-6">
                        <h1><Link href="/auth/sign-in" className="hover:text-gray-400">Games</Link></h1>
                        <h1><Link href="/auth/sign-in" className="hover:text-gray-400">News</Link></h1>
                        <h1><Link href="/auth/sign-in" className="hover:text-gray-400">About</Link></h1>
                    </div>

                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-8">
                    {/* Mode Selector */}
                    <div className="relative max-md:hidden">
                        <button
                            onClick={() => setModeOpen(!isModeOpen)}
                            className="flex items-center space-x-1 hover:text-gray-400"
                        >
                            <MonitorCog size={18} />
                            <span>{mode}</span>
                            <ChevronDown size={16} />
                        </button>
                        {isModeOpen && (
                            <div className="absolute bg-gray-900 mt-2 rounded-lg shadow-lg py-2 w-28 z-10">
                                <button onClick={() => setMode('Dark')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><Moon size={12} />Dark</button>
                                <button onClick={() => setMode('Light')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><Sun size={12} />Light</button>
                                <button onClick={() => setMode('System')} className="flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-700 w-full"><MonitorCog size={12} />System</button>
                            </div>
                        )}
                    </div>

                    {/* Language Selector */}
                    <div className="relative max-md:hidden">
                        <button
                            onClick={() => setLangOpen(!isLangOpen)}
                            className="flex items-center space-x-1 hover:text-gray-400"
                        >
                            <Globe size={18} />
                            <span>{language}</span>
                            <ChevronDown size={16} />
                        </button>
                        {isLangOpen && (
                            <div className="absolute bg-gray-900 mt-2 rounded-lg shadow-lg py-2 w-20 z-10">
                                <button onClick={() => setLanguage('EN')} className="block px-4 py-2 text-sm hover:bg-gray-700 w-full">EN</button>
                                <button onClick={() => setLanguage('ID')} className="block px-4 py-2 text-sm hover:bg-gray-700 w-full">ID</button>
                            </div>
                        )}
                    </div>

                    {/* User Icon */}
                    <User size={20} className="hover:text-gray-400 cursor-pointer" />
                </div>
            </nav>

            <main>{children}</main>
        </div>
    )
}