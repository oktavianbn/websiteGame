"use client"

import Image from "next/image";
import eyeWhite from "@/public/asset/svg/eye-white.svg";
import eyeWhiteClose from "@/public/asset/svg/eye-white-close.svg";
import { useRef, useState } from "react";
import { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { log } from "console";
import validator from "validator";

export default function SignUp() {
    // Refs untuk input dan pesan error
    const inputUsername = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);
    const h6Username = useRef<HTMLHeadingElement>(null);
    const h6Email = useRef<HTMLHeadingElement>(null);
    const h6Password = useRef<HTMLHeadingElement>(null);

    // State untuk menyimpan nilai input
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eyeOpen, setEyeOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [passwordStrong, setPasswordStrong] = useState(false);
    const [passwordConfirmText, setPasswordConfirmText] = useState("")
    const [emailConfirmText, setEmailConfirmText] = useState("")

    // Regex untuk validasi password (minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol)
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    const auth = () => {
        // usn
        if (username.trim() === "") {
            inputUsername.current?.classList.add("border-red-600");
            inputUsername.current?.classList.remove("border-gray-400");
            h6Username.current?.classList.remove("hidden");
        } else {
            inputUsername.current?.classList.add("border-gray-400");
            inputUsername.current?.classList.remove("border-red-600");
            h6Username.current?.classList.add("hidden");
        };
        // eml
        if (email.trim() === "") {
            inputEmail.current?.classList.add("border-red-600");
            inputEmail.current?.classList.remove("border-gray-400");
            h6Email.current?.classList.remove("hidden");
            setEmailConfirmText("Email must be filled!");
        } else if (!validator.isEmail(email)) {
            inputEmail.current?.classList.add("border-red-600");
            inputEmail.current?.classList.remove("border-gray-400");
            h6Email.current?.classList.remove("hidden");
            setEmailConfirmText("Your email not falid!");
        } else {
            inputEmail.current?.classList.add("border-gray-400");
            setEmailConfirmText("");
        }
        // pw
        if (password.trim() === "") {
            inputPassword.current?.classList.add("border-red-600");
            inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
            h6Password.current?.classList.remove("hidden");
            h6Password.current?.classList.remove("text-yellow-600");
            setPasswordConfirmText("Password must be filled!");
        } else if (password.length < 8) {
            inputPassword.current?.classList.add("border-red-600");
            inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
            h6Password.current?.classList.remove("hidden");
            h6Password.current?.classList.remove("text-yellow-600");
            setPasswordConfirmText("Password must have 8 characters!");
        } else if (!strongPassword.test(password)) {
            inputPassword.current?.classList.add("border-yellow-600");
            inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
            h6Password.current?.classList.remove("hidden");
            h6Password.current?.classList.add("text-yellow-600");
            setPasswordConfirmText("Your password not strong!");
            setPasswordStrong(false);
            setIsOpen(true);
        } else {
            inputPassword.current?.classList.add("border-gray-400");
            inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
            h6Password.current?.classList.add("hidden");
            h6Password.current?.classList.remove("text-yellow-600");
        }
    }

    return (
        <main className="bg-black h-screen w-full flex justify-center items-center">
            <button className="text-white" type="button" onClick={auth}>test</button>
            <div className="container mx-auto border-solid border-white border-2 rounded-2xl w-max flex flex-col gap-3 p-4">
                <h1 className="title font-semibold text-2xl text-white dark:text-black  flex justify-center">
                    Sign Up
                </h1>

                <form className="container flex flex-col gap-3" action="" method="post" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col items-start w-full gap-1">
                        <label htmlFor="username" className="font-medium md:text-sm text-xs dark:text-black text-white">
                            Username :
                        </label>
                        <input
                            ref={inputUsername}
                            type="text"
                            placeholder="Input your name"
                            name="username"
                            id="username"
                            value={username}

                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full text-white dark:text-black bg-transparent md:text-sm text-xs p-2 px-3 rounded-md outline-none border placeholder:text-gray-400 transition-all border-gray-400 focus:border-blue-500"
                        />
                        <h6 ref={h6Username} className="hidden text-red-600 text-xs">Username must be filled!</h6>
                    </div>

                    <div className="flex flex-col items-start w-full gap-1">
                        <label htmlFor="email" className="font-medium md:text-sm text-xs dark:text-black text-white">
                            Email :
                        </label>
                        <input
                            ref={inputEmail}
                            type="email"
                            placeholder="Input your email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-white dark:text-black bg-transparent md:text-sm text-xs p-2 px-3 rounded-md outline-none border placeholder:text-gray-400 transition-all border-gray-400 focus:border-blue-500"
                        />
                        <h6 ref={h6Email} className="hidden text-red-600 text-xs">{emailConfirmText}</h6>
                    </div>

                    <div className="flex flex-col items-start w-full gap-1">
                        <label htmlFor="password" className="font-medium md:text-sm text-xs dark:text-black text-white">
                            Password :
                        </label>
                        <div ref={inputPassword} className="flex relative border border-gray-400 rounded-md focus-within:border-blue-500 transition-all w-full">
                            <input
                                type={eyeOpen ? "password" : "text"}
                                placeholder="Input your password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-white dark:text-black bg-transparent md:text-sm text-xs py-2 pl-3 placeholder:text-gray-400 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setEyeOpen((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all"
                            >
                                {eyeOpen ? (
                                    <Image src={eyeWhiteClose} alt="Hide password" />
                                ) : (
                                    <Image src={eyeWhite} alt="Show password" />
                                )}
                            </button>
                        </div>
                        <h6 ref={h6Password} className="hidden text-red-600 text-xs">{passwordConfirmText}</h6>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white dark:bg-black text-black md:text-sm text-xs py-2 rounded-lg mt-3"
                    >
                        Create Account
                    </button>
                </form>

                <div className="justify-center text-white dark:text-black text-xs flex gap-1">
                    <h1 className="text-xs">
                        Already have an account?{" "}
                        <button
                            className="underline underline-offset-1 text-blue-500"
                        >
                            Login
                        </button>
                    </h1>
                </div>
            </div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Weak Password</AlertDialogTitle>
                        <AlertDialogDescription>
                            Use at least 8 characters with numbers & symbols.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { setIsOpen(false); setPasswordStrong(false); }}>NO</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { setIsOpen(false); setPasswordStrong(true); }}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}
