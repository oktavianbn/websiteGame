"use client";

import { useRef, useState } from "react";
import { addDataUser } from "../lib/database";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AuthUser() {
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const h6Username = useRef<HTMLHeadingElement>(null);
  const h6Password = useRef<HTMLHeadingElement>(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordConfirmText, setPasswordConfirmText] = useState("");
  const [PasswordStrong, setPasswordStrong] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;

  const dataAddAndGet = () => {
    if (login == true) {
      // logika login
    } else {
      // logika sign up
      try {
        addDataUser(username, password);
      } catch (error) {
        console.error("Error adding document: ", error);
        setUserName("");
        setPassword("");
      }
    }
  };

  const uploadData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "") {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
    } else {
      inputUsername.current?.classList.add("border-gray-400");
      inputUsername.current?.classList.remove("border-red-600");
      h6Username.current?.classList.add("hidden");
    }
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
    } else if (!strong.test(password)) {
      inputPassword.current?.classList.add("border-yellow-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.add("text-yellow-600");
      setPasswordConfirmText("Your password not strong!");
      setPasswordStrong(!PasswordStrong);
      setIsOpen(true);
    } else {
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
    }
  }
  if (PasswordStrong == true) {
    // dataAddAndGet();
  } else {
  }

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <div className="container mx-auto border-solid border-white border-2 rounded-2xl w-max flex flex-col gap-3 p-4">
        <div className="logo "></div>
        <h1 className="title font-semibold text-2xl text-white dark:text-black  flex justify-center">
          {login ? "Login" : "Sign Up"}
        </h1>
        <form className="container flex flex-col gap-3" action="" method="post">
          <div className="username flex flex-col items-start w-full gap-1">
            <label
              htmlFor="username"
              className="font-medium md:text-sm text-xs dark:text-black text-white"
            >
              Name :
            </label>
            <input
              ref={inputUsername}
              type="text"
              placeholder="Input your name"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-white dark:text-black bg-transparent md:text-sm text-xs p-2 px-3 rounded-md outline-none border placeholder:text-gray-400 duration-200 transition-all border-gray-400 focus:border-blue-500"
            />
            <h6 ref={h6Username} className="hidden text-red-600 text-xs">
              Username must be filled!
            </h6>
          </div>
          <div className="password flex flex-col items-start w-full gap-1">
            <label
              htmlFor="password"
              className="font-medium md:text-sm text-xs dark:text-black text-white"
            >
              Password :
            </label>
            <input
              ref={inputPassword}
              type="password"
              placeholder="Input your password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-white dark:text-black bg-transparent md:text-sm text-xs p-2 px-3 rounded-md outline-none border placeholder:text-gray-400 duration-200 transition-all border-gray-400 focus:border-blue-500"
            />
            <h6 ref={h6Password} className="hidden text-red-600 text-xs">
              {PasswordConfirmText}
            </h6>
          </div>
          <button
            type="submit"
            className="w-full bg-white dark:bg-black text-black  md:text-sm text-xs py-2 rounded-lg mt-3"
            onClick={uploadData}
          >
            {login ? "Login" : "Create Account"}
          </button>
        </form>
        <div className="justify-center text-white dark:text-black text-xs flex gap-1">
          <h1 className="text-xs">
            {login
              ? "Don't have an account yet? " : "Already have an account? "}
            <button
              className="underline underline-offset-1 text-blue-500"
              onClick={() => setLogin(!login)}
            >
              {login ? "Sign Up" : "Login"}
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
            <AlertDialogCancel onClick={() => { setIsOpen(false); setPasswordStrong(!PasswordStrong); }}>NO</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setIsOpen(false); setPasswordStrong(PasswordStrong); }}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
