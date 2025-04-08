'use client'

import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (

        <div className="font-poppins flex flex-col items-center justify-center w-full h-screen px-2 bg-gradient-to-l from-ebony via-ebony-clay to-ebony overflow-visible">
            <div className="flex flex-col justify-between h-max">
                <div className="flex max-md:flex-col text-4xl font-bold text-center md:gap-[0.5ch]">
                    <span className="text-white">Welcome to</span>
                    <span className="text-blue-500">Play Portal</span>
                </div>
                <h1 className="text-xl md:text-2xl text-center text-white">
                    Your Gateway to Endless Fun!
                </h1>
                <div className="flex items-center justify-center w-full">
                    {children}
                </div>
            </div>
            <h1 className="mt-10 text-white text-sm md:text-base">
                © 2025 Play Portal. Your Gateway to Fun.
            </h1>
        </div>
    )
}