/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import eyeWhite from "@/public/asset/svg/eye-white.svg";
import eyeWhiteClose from "@/public/asset/svg/eye-white-close.svg";
import personWhite from "@/public/asset/svg/person-white.svg"
import lockWhite from "@/public/asset/svg/lock-white.svg"
import { useRef, useState } from "react";
import Link from "next/link";

export default function LogIn() {
  // Refs untuk input dan pesan error
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const h6Username = useRef<HTMLHeadingElement>(null);
  const h6Password = useRef<HTMLHeadingElement>(null);

  // State untuk menyimpan nilai input
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(true);
  const [usenameConfirmText, setUsenameConfirmText] = useState("");
  const [passwordConfirmText, setPasswordConfirmText] = useState("");

  // Regex untuk validasi password (minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol)
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validUsename = /^(?=.*[@#$%^&*()!~/?+=|<>`";:{}()])$/

  const authUsn = () => {
    if (username.trim() === "") {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Usename must be filled!")
    } else if (!validUsename.test(username)) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username cannot contain special characters!")
    } else {
      inputUsername.current?.classList.add("border-gray-400");
      inputUsername.current?.classList.remove("border-red-600");
      h6Username.current?.classList.add("hidden");
      setUsenameConfirmText("")
    }
  };

  const authPw = () => {
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
      setPasswordConfirmText("Password must have at least 8 characters!");
    } else if (!strongPassword.test(password)) {
      inputPassword.current?.classList.add("border-yellow-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.add("text-yellow-600");
      setPasswordConfirmText("Your password is not strong!");
    } else {
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
    }
  };

  return (
    <main className="font-poppins flex flex-col items-center justify-center px-2 w-full h-screen bg-gradient-to-l from-ebony via-ebony-clay to-ebony overflow-visible">
      <div className="flex flex-col gap-3">
        <div className="flex max-md:flex-col text-4xl font-bold text-center md:gap-[0.5ch]">
          <span className="text-white">Welcome to</span><span className="text-blue-500">Play Portal</span>
        </div>
        <h1 className="text-xl md:text-2xl text-center text-white">
          Your Gateway to Endless Fun!
        </h1>

        <div className="flex items-center justify-center w-full">
          <div className="w-full px-6 py-6 md:py-10 mx-5 mt-10 border-2 border-solid rounded-2xl border-charcoal flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-white dark:text-black flex justify-center">
              Sign In
            </h1>

            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              {/* Username Field */}
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="username" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
                  Username :
                </label>
                <div ref={inputUsername} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
                  <div className="flex items-center justify-center pl-3">
                    <Image src={personWhite} alt="Show password" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="Username"
                    placeholder="Input your Username"
                    value={username}
                    onBlur={authUsn}
                    autoComplete="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full py-2 pl-1 rounded-r-md ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
                  />
                </div>
                <h6 ref={h6Username} className="hidden text-xs text-red-600">{usenameConfirmText}</h6>
              </div>

              {/* Password Field */}
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="password" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
                  Password :
                </label>
                <div ref={inputPassword} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
                  <div className="flex items-center justify-center pl-3">
                    <Image src={lockWhite} alt="Show password" />
                  </div>
                  <input
                    type={eyeOpen ? "password" : "text"}
                    id="password"
                    name="password"
                    placeholder="Input your password"
                    value={password}
                    onBlur={authPw}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 pl-1  ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setEyeOpen((prev) => !prev)}
                    className="flex items-center justify-center px-3"
                  >
                    {eyeOpen ? <Image src={eyeWhiteClose} alt="Hide password" /> : <Image src={eyeWhite} alt="Show password" />}
                  </button>
                </div>
                <h6 ref={h6Password} className="hidden text-xs text-red-600">{passwordConfirmText}</h6>
              </div>

              <button type="submit" className="w-full py-2 mt-3 text-xs md:text-sm text-white bg-blue-500 rounded-lg dark:bg-black">
                Login
              </button>
            </form>

            <div className="flex gap-1 text-xs text-white dark:text-black justify-center">
              <h1 className="text-xs">Don't have an account yet?</h1>
              <Link href={"sign-up"}>
                <button className="text-blue-500 underline underline-offset-1">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-white text-sm md:text-base">© 2025 Play Portal. Your Gateway to Fun.</h1>
    </main>
  );
}