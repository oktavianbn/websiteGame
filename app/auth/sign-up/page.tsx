"use client";

import Image from "next/image";
import eyeWhite from "@/public/asset/svg/eye-white.svg";
import eyeWhiteClose from "@/public/asset/svg/eye-white-close.svg";
import personWhite from "@/public/asset/svg/person-white.svg"
import mailWhite from "@/public/asset/svg/mail-white.svg"
import lockWhite from "@/public/asset/svg/lock-white.svg"
import { useRef, useState } from "react";
import validator from "validator";
import Link from "next/link";
import { addDataUser } from "@/lib/database";
import { findUser } from "@/lib/database";

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
  const [usenameConfirmText, setUsenameConfirmText] = useState("");
  const [passwordConfirmText, setPasswordConfirmText] = useState("");
  const [emailConfirmText, setEmailConfirmText] = useState("");
  const [eyeOpen, setEyeOpen] = useState(true);
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState(true);
  const [emailAvailability, setEmailAvailability] = useState(true);

  // Regex untuk validasi password (minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol)
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validUsename = /^[a-zA-Z0-9_]+$/;

  const authUsn = () => {
    if (username.trim() === "") {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Usename must be filled!")
      setUsernameStatus(false);
    } else if (!validUsename.test(username)) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username cannot contain special characters!")
      setUsernameStatus(false);
    } else if (usernameAvailability == false) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Your usename is already in use!")
      setUsernameStatus(false);
    } else {
      inputUsername.current?.classList.add("border-gray-400");
      inputUsername.current?.classList.remove("border-red-600");
      h6Username.current?.classList.add("hidden");
      setUsenameConfirmText("");
      setUsernameStatus(true);
    }
  };

  const authEmail = () => {
    if (email.trim() === "") {
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Email must be filled!");
      setEmailStatus(false);
    } else if (!validator.isEmail(email)) {
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Your email is not valid!");
      setEmailStatus(false);
    } else if (emailAvailability == false) {
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Your email is already in use!");
      setEmailStatus(false);
    } else {
      inputEmail.current?.classList.add("border-gray-400");
      inputEmail.current?.classList.remove("border-red-600");
      h6Email.current?.classList.add("hidden");
      setEmailConfirmText("");
      setEmailStatus(true);
    }
  };

  const authPw = () => {
    if (password.trim() === "") {
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("Password must be filled!");
      setPasswordStatus(false);
    } else if (password.length < 8) {
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("Password must have at least 8 characters!");
      setPasswordStatus(false);
    } else if (!strongPassword.test(password)) {
      inputPassword.current?.classList.add("border-yellow-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.add("text-yellow-600");
      setPasswordConfirmText("Your password is not strong!");
      setPasswordStatus(true)
    } else {
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("");
      setPasswordStatus(true)
    }
  };

  const userDataVerification = async () => {
    try {
      const userByUsername = await findUser("username", username);
      setUsernameAvailability(!userByUsername);

      const userByEmail = await findUser("email", email);
      setEmailAvailability(!userByEmail);
    } catch (error) {
      console.log("Error 3 ", error);
    }
  };


  const manipulationAddDataUser = async () => {
    await userDataVerification();
    authUsn();
    authEmail();
    authPw();
    // await manipulationAddDataUser();
    if (usernameStatus == true && emailStatus == true && passwordStatus == true) {
      try {
        await addDataUser(username, email, password);
      } catch (error) {
        console.error("Error adding document: ", error);
        setUserName("");
        setEmail("");
        setPassword("");
      }
    } else {
      console.log("error 1");
    }
  }

  return (
    <main className="font-poppins flex flex-col items-center justify-center w-full h-screen px-2 bg-gradient-to-l from-ebony via-ebony-clay to-ebony overflow-visible">
      <div className="flex flex-col justify-between h-max">
        <div className="flex max-md:flex-col text-4xl font-bold text-center md:gap-[0.5ch]">
          <span className="text-white">Welcome to</span><span className="text-blue-500">Play Portal</span>
        </div>
        <h1 className="text-xl md:text-2xl text-center text-white">
          Your Gateway to Endless Fun!
        </h1>

        <div className="flex items-center justify-center w-full">
          <div className="w-full px-6 py-6 md:py-8 mx-5 mt-10 border-2 border-solid rounded-2xl border-charcoal flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-white dark:text-black flex justify-center">
              Sign Up
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

              {/* Email Field */}
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="email" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
                  Email :
                </label>
                <div ref={inputEmail} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
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
                <h6 ref={h6Email} className="hidden text-xs text-red-600">{emailConfirmText}</h6>
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
              <button
                type="submit"
                className="w-full py-2 mt-3 text-xs md:text-sm text-white bg-blue-500 rounded-lg dark:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={async () => {
                  await userDataVerification();
                  authUsn();
                  authEmail();
                  authPw();
                  await manipulationAddDataUser();
                }}
              // disabled={!usernameStatus || !emailStatus || !passwordStatus}
              >
                Create Account
              </button>
            </form>

            <div className="flex gap-1 text-xs text-white dark:text-black justify-center">
              <h1 className="text-xs">Already have an account?</h1>
              <Link href={"sign-in"}>
                <button className="text-blue-500 underline underline-offset-1">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-white text-sm md:text-base">© 2025 Play Portal. Your Gateway to Fun.</h1>
    </main>
  );
}
