/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import eyeWhite from "@/public/asset/svg/eye-white.svg";
import eyeWhiteClose from "@/public/asset/svg/eye-white-close.svg";
import personWhite from "@/public/asset/svg/person-white.svg"
import lockWhite from "@/public/asset/svg/lock-white.svg"
import { useRef, useState } from "react";
import Link from "next/link";
import validator from "validator";
import router from "next/router";

export default function LogIn() {
  // Refs untuk input dan pesan error
  const inputUsernameOrEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const h6UsernameOrEmail = useRef<HTMLHeadingElement>(null);
  const h6Password = useRef<HTMLHeadingElement>(null);

  // State untuk menyimpan nilai input
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [usernameOrEmailMessage, setUsernameOrEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  
  const [isUsernameOrEmailAvailable, setIsUsernameOrEmailAvailable] = useState(true);
  const [isPasswordAvailable, setIsPasswordAvailable] = useState(true);
  
  const [isUsernameOrEmailValid, setIsUsernameOrEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);
  

  // Regex untuk validasi password (minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol)
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validUsename = /^(?=.*[@#$%^&*()!~/?+=|<>`";:{}()])$/

  const authUsnOrEmail = () => {
    console.log("Running authUsn...FE");
    if (usernameOrEmail.trim() === "") {
      console.log("UsernameOrEmail kosong.FE");
      inputUsernameOrEmail.current?.classList.add("border-red-600");
      inputUsernameOrEmail.current?.classList.remove("border-gray-400");
      h6UsernameOrEmail.current?.classList.remove("hidden");
      setUsernameOrEmailMessage("Username Or Email must be filled!");
      setIsUsernameOrEmailValid(false);
    } else if (isUsernameOrEmailAvailable === false) {
      console.log("UsernameOrEmail sudah digunakan.FE");
      inputUsernameOrEmail.current?.classList.add("border-red-600");
      inputUsernameOrEmail.current?.classList.remove("border-gray-400");
      h6UsernameOrEmail.current?.classList.remove("hidden");
      setUsernameOrEmailMessage("Your Username or Email is Not Available");
      setIsUsernameOrEmailValid(false);
    } else {
      console.log("UsernameOrEmail valid.FE");
      inputUsernameOrEmail.current?.classList.add("border-gray-400");
      inputUsernameOrEmail.current?.classList.remove("border-red-600");
      h6UsernameOrEmail.current?.classList.add("hidden");
      setUsernameOrEmailMessage("");
      setIsUsernameOrEmailValid(true);
    }
  };

  const authPw = () => {
    console.log("Running authPw...FE");
    if (password.trim() === "") {
      console.log("Password kosong.FE");
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden", "text-yellow-600");
      setPasswordMessage("Password must be filled!");
      setIsPasswordValid(false);
    } else if (isPasswordAvailable===false) {
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordMessage("Your Password Is Incorrect");
    } else {
      console.log("Password valid.FE");
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordMessage("");
      setIsPasswordValid(true);
    }
  };

  // const userDataVerification = async () => {
  //   try {
  //     if (validator.isEmail(usernameOrEmail)) {
  //       const [UsernameOrEmailCheck, passwordChek] = await Promise.all([
  //         findUser("username", usernameOrEmail),
  //         // findUser("password", password),
  //       ]);
  //       console.log(!UsernameOrEmailCheck?.found, "1");
  //       console.log(!passwordChek?.found, "2");
  //       setIsUsernameOrEmailAvailable(!UsernameOrEmailCheck?.found);
  //       setIsPasswordAvailable(!passwordChek?.found);
  //     } else {
  //       const [UsernameOrEmailCheck, passwordChek] = await Promise.all([
  //         findUser("email", usernameOrEmail),
  //         // findUser("password", password),
  //       ]);
  //       console.log(!UsernameOrEmailCheck?.found, "1");
  //       console.log(!passwordChek?.found, "2");
  //       setIsUsernameOrEmailAvailable(!UsernameOrEmailCheck?.found);
  //       setIsPasswordAvailable(!passwordChek?.found);
  //     }

  //   } catch (error) {
  //     console.log("Verification error FE:", error);
  //   }
  // };

  // const findDataUser = async () => {
  //   setIsLoading(true);
  //   await userDataVerification();
  //   if (isPasswordAvailable===true && isUsernameOrEmailAvailable===true) {
  //     router.replace("/landing/game");
  //   } else {
  //     return;
  //   }
  //   setIsLoading(false);
  // }

  return (

    <main className="w-full px-6 py-6 md:py-10 mx-5 mt-10 border-2 border-solid rounded-2xl border-charcoal flex flex-col gap-3">
      <h1 className="text-xl md:text-2xl font-semibold text-white dark:text-black flex justify-center">
        Sign In
      </h1>

      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        {/* UsernameOrEmail Field */}
        <div className="flex flex-col items-start w-full gap-1">
          <label htmlFor="UsernameOrEmail" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
            Username Or Email :
          </label>
          <div ref={inputUsernameOrEmail} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
            <div className="flex items-center justify-center pl-3">
              <Image src={personWhite} alt="Show password" />
            </div>
            <input
              type="text"
              id="UsernameOrEmail"
              name="UsernameOrEmail"
              placeholder="Input your Username Or Email"
              value={usernameOrEmail}
              onBlur={authUsnOrEmail}
              autoComplete="UsernameOrEmail"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full py-2 pl-1 rounded-r-md ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
            />
          </div>
          <h6 ref={h6UsernameOrEmail} className="hidden text-xs text-red-600">{usernameOrEmailMessage}</h6>
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
              type={isPasswordVisible ? "password" : "text"}
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
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="flex items-center justify-center px-3"
            >
              {isPasswordVisible ? <Image src={eyeWhiteClose} alt="Hide password" /> : <Image src={eyeWhite} alt="Show password" />}
            </button>
          </div>
          <h6 ref={h6Password} className="hidden text-xs text-red-600">{passwordMessage}</h6>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 text-xs md:text-sm text-white bg-blue-500 rounded-lg dark:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={findDataUser}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="flex gap-1 text-xs text-white dark:text-black justify-center">
        <h1 className="text-xs">Don't have an account yet?</h1>
        <Link href={"sign-up"}>
          <button className="text-blue-500 underline underline-offset-1">Sign Up</button>
        </Link>
      </div>
    </main>
  );
}