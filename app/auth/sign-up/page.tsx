/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import eyeWhite from "@/public/asset/svg/eye-white.svg";
import eyeWhiteClose from "@/public/asset/svg/eye-white-close.svg";
import personWhite from "@/public/asset/svg/person-white.svg";
import mailWhite from "@/public/asset/svg/mail-white.svg";
import lockWhite from "@/public/asset/svg/lock-white.svg";
import { useEffect, useRef, useState } from "react";
import validator from "validator";
import Link from "next/link";
import { addNewDataUser } from "@/lib/database";
import { useRouter } from "next/navigation";

export default function SignUp() {
  // Refs untuk input dan pesan error
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const h6Username = useRef<HTMLHeadingElement>(null);
  const h6Email = useRef<HTMLHeadingElement>(null);
  const h6Password = useRef<HTMLHeadingElement>(null);

  // State untuk menyimpan nilai input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);


  const router = useRouter();

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+])[A-Za-z\d@$!%*?&]{8,}$/;
  const validUsername = /^[a-zA-Z0-9_]+$/;
  const authUsn = () => {
    console.log("Running authUsn...FE");
    if (username.trim() === "") {
      console.log("Username kosong.FE");
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsernameMessage("Username must be filled!");
      setIsUsernameValid(false);
    } else if (!validUsername.test(username)) {
      console.log("Username mengandung karakter khusus.FE");
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsernameMessage("Username cannot contain special characters!");
      setIsUsernameValid(false);
    } else if (isUsernameAvailable === false) {
      console.log("Username sudah digunakan.FE");
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsernameMessage("Your username is already in use!");
      setIsUsernameValid(false);
    } else {
      console.log("Username valid.FE");
      inputUsername.current?.classList.add("border-gray-400");
      inputUsername.current?.classList.remove("border-red-600");
      h6Username.current?.classList.add("hidden");
      setUsernameMessage("");
      setIsUsernameValid(true);
    }
  };

  const authEmail = () => {
    console.log("Running authEmail...FE");
    if (email.trim() === "") {
      console.log("Email kosong.FE");
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailMessage("Email must be filled!");
      setIsEmailValid(false);
    } else if (!validator.isEmail(email)) {
      console.log("Format email tidak valid.FE");
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailMessage("Your email is not valid!");
      setIsEmailValid(false);
    } else if (isEmailAvailable === false) {
      console.log("Email sudah digunakan.FE");
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailMessage("Your email is already in use!");
      setIsEmailValid(false);
    } else {
      console.log("Email valid.FE");
      inputEmail.current?.classList.add("border-gray-400");
      inputEmail.current?.classList.remove("border-red-600");
      h6Email.current?.classList.add("hidden");
      setEmailMessage("");
      setIsEmailValid(true);
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
    } else if (password.length < 8) {
      console.log("Password kurang dari 8 karakter.FE");
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden", "text-yellow-600");
      setPasswordMessage("Password must have at least 8 characters!");
      setIsPasswordValid(false);
    } else if (!strongPassword.test(password)) {
      console.log("Password tidak cukup kuat.FE");
      inputPassword.current?.classList.add("border-yellow-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.add("text-yellow-600");
      setPasswordMessage("Your password is not strong!");
      setIsPasswordValid(true);
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
  //     const [usernameCheck, emailCheck] = await Promise.all([
  //       findUser("username", username),
  //       findUser("email", email),
  //     ]);

  //     console.log(!usernameCheck?.found, "1");
  //     console.log(!emailCheck?.found, "2");
  //     setIsUsernameAvailable(!usernameCheck?.found);
  //     setIsEmailAvailable(!emailCheck?.found);
  //   } catch (error) {
  //     console.log("Verification error FE:", error);
  //   }
  // };

  const manipulationAddDataUser = async () => {
    setIsLoading(true);

    authUsn();
    authEmail();
    authPw();

    // await userDataVerification();

    setHasCheckedAvailability(true);

    setIsLoading(false);
  };

  useEffect(() => {
    if (hasCheckedAvailability && isUsernameAvailable !== null && isEmailAvailable !== null) {
      authUsn();
      authEmail();

      if (isUsernameValid && isEmailValid && isPasswordValid && isUsernameAvailable && isEmailAvailable) {
        try {
          addNewDataUser(username, email, password);
          router.replace("/landing/game");
        } catch (error) {
          console.error("Verification error:", error);
        }
      }

      setHasCheckedAvailability(false);
    }
  }, [hasCheckedAvailability, isUsernameAvailable, isEmailAvailable, isUsernameValid, isEmailValid, isPasswordValid,
  ]);

  return (
    <main className="w-full px-6 py-6 md:py-8 mx-5 mt-10 border-2 border-solid rounded-2xl border-charcoal flex flex-col gap-3">
      <h1 className="text-xl md:text-2xl font-semibold text-white dark:text-black flex justify-center">
        Sign Up
      </h1>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Username Field */}
        <div className="flex flex-col items-start w-full gap-1">
          <label
            htmlFor="username"
            className="text-xs font-medium text-light-silver md:text-sm dark:text-black"
          >
            Username :
          </label>
          <div
            ref={inputUsername}
            className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all"
          >
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
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-1 rounded-r-md ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
            />
          </div>
          <h6 ref={h6Username} className="hidden text-xs text-red-600">
            {usernameMessage}
          </h6>
        </div>

        {/* Email Field */}
        <div className="flex flex-col items-start w-full gap-1">
          <label
            htmlFor="email"
            className="text-xs font-medium text-light-silver md:text-sm dark:text-black"
          >
            Email :
          </label>
          <div
            ref={inputEmail}
            className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all"
          >
            <div className="flex items-center justify-center pl-3">
              <Image src={mailWhite} alt="Show password" />
            </div>
            <input
              type="email"
              id="email"
              name="Email"
              placeholder="Input your Email"
              value={email}
              onBlur={authEmail}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 pl-1 rounded-r-md ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
            />
          </div>
          <h6 ref={h6Email} className="hidden text-xs text-red-600">
            {emailMessage}
          </h6>
        </div>

        {/* Password Field */}
        <div className="flex flex-col items-start w-full gap-1">
          <label
            htmlFor="password"
            className="text-xs font-medium text-light-silver md:text-sm dark:text-black"
          >
            Password :
          </label>
          <div
            ref={inputPassword}
            className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all"
          >
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
              {isPasswordVisible ? (
                <Image src={eyeWhiteClose} alt="Hide password" />
              ) : (
                <Image src={eyeWhite} alt="Show password" />
              )}
            </button>
          </div>
          <h6 ref={h6Password} className="hidden text-xs text-red-600">
            {passwordMessage}
          </h6>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 text-xs md:text-sm text-white bg-blue-500 rounded-lg dark:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={manipulationAddDataUser}
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
            "Create Account"
          )}
        </button>
      </form>

      <div className="flex gap-1 text-xs text-white dark:text-black justify-center">
        <h1 className="text-xs">Already have an account?</h1>
        <Link href={"sign-in"}>
          <button className="text-blue-500 underline underline-offset-1">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}
/* 
list bug
1.saat input salah dan input telah diganti state availability belum diperbaharui
*/