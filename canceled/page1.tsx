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
  // Type untuk fungsi debounce
  type DebounceFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

  // Refs untuk input dan pesan error
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputConfirmPassword = useRef<HTMLInputElement>(null);
  const h6Username = useRef<HTMLHeadingElement>(null);
  const h6Email = useRef<HTMLHeadingElement>(null);
  const h6Password = useRef<HTMLHeadingElement>(null);
  const h6ConfirmPassword = useRef<HTMLHeadingElement>(null);

  // State untuk menyimpan nilai input
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usenameConfirmText, setUsenameConfirmText] = useState<string>("");
  const [passwordConfirmText, setPasswordConfirmText] = useState<string>("");
  const [emailConfirmText, setEmailConfirmText] = useState<string>("");
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [eyeOpenConfirm, setEyeOpenConfirm] = useState<boolean>(true);
  const [usernameStatus, setUsernameStatus] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);
  const [usernameAvailability, setUsernameAvailability] = useState<boolean>(true);
  const [emailAvailability, setEmailAvailability] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0); // 0-4 (lemah-kuat)

  // Regex untuk validasi password (minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol)
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validUsename = /^[a-zA-Z0-9_]+$/;

  // Fungsi untuk validasi dengan debounce
  const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): DebounceFunction<T> => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fungsi untuk menghitung kekuatan password
  const calculatePasswordStrength = (pw: string): number => {
    let strength = 0;
    if (pw.length >= 8) strength += 1;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) strength += 1;
    if (/\d/.test(pw)) strength += 1;
    if (/[@$!%*?&]/.test(pw)) strength += 1;
    return strength;
  };

  // Validasi username dengan debounce
  const validateUsername = debounce(async (value: string) => {
    if (value.trim() === "") {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username harus diisi!");
      setUsernameStatus(false);
      return;
    }

    if (value.length < 3) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username minimal 3 karakter!");
      setUsernameStatus(false);
      return;
    }

    if (value.length > 20) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username maksimal 20 karakter!");
      setUsernameStatus(false);
      return;
    }

    if (!validUsename.test(value)) {
      inputUsername.current?.classList.add("border-red-600");
      inputUsername.current?.classList.remove("border-gray-400");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Username tidak boleh mengandung karakter khusus!");
      setUsernameStatus(false);
      return;
    }

    // Cek ketersediaan username di database
    try {
      setIsLoading(true);
      const userByUsername = await findUser("username", value);
      setIsLoading(false);

      if (userByUsername) {
        inputUsername.current?.classList.add("border-red-600");
        inputUsername.current?.classList.remove("border-gray-400");
        h6Username.current?.classList.remove("hidden");
        setUsenameConfirmText("Username sudah digunakan!");
        setUsernameStatus(false);
        setUsernameAvailability(false);
      } else {
        inputUsername.current?.classList.add("border-gray-400");
        inputUsername.current?.classList.remove("border-red-600");
        h6Username.current?.classList.add("hidden");
        setUsenameConfirmText("");
        setUsernameStatus(true);
        setUsernameAvailability(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error memeriksa username:", error);
      inputUsername.current?.classList.add("border-yellow-600");
      h6Username.current?.classList.remove("hidden");
      setUsenameConfirmText("Gagal memeriksa ketersediaan username");
    }
  }, 500); // debounce 500ms

  // Validasi email dengan pendekatan yang sama
  const validateEmail = debounce(async (value: string) => {
    if (value.trim() === "") {
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Email harus diisi!");
      setEmailStatus(false);
      return;
    }

    if (!validator.isEmail(value)) {
      inputEmail.current?.classList.add("border-red-600");
      inputEmail.current?.classList.remove("border-gray-400");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Format email tidak valid!");
      setEmailStatus(false);
      return;
    }

    // Cek ketersediaan email di database
    try {
      setIsLoading(true);
      const userByEmail = await findUser("email", value);
      setIsLoading(false);

      if (userByEmail) {
        inputEmail.current?.classList.add("border-red-600");
        inputEmail.current?.classList.remove("border-gray-400");
        h6Email.current?.classList.remove("hidden");
        setEmailConfirmText("Email sudah digunakan!");
        setEmailStatus(false);
        setEmailAvailability(false);
      } else {
        inputEmail.current?.classList.add("border-gray-400");
        inputEmail.current?.classList.remove("border-red-600");
        h6Email.current?.classList.add("hidden");
        setEmailConfirmText("");
        setEmailStatus(true);
        setEmailAvailability(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error memeriksa email:", error);
      inputEmail.current?.classList.add("border-yellow-600");
      h6Email.current?.classList.remove("hidden");
      setEmailConfirmText("Gagal memeriksa ketersediaan email");
    }
  }, 500);

  // Validasi password
  const validatePassword = (value: string): void => {
    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);

    if (value.trim() === "") {
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("Password harus diisi!");
      setPasswordStatus(false);
    } else if (value.length < 8) {
      inputPassword.current?.classList.add("border-red-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-yellow-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("Password minimal 8 karakter!");
      setPasswordStatus(false);
    } else if (strength < 3) {
      inputPassword.current?.classList.add("border-yellow-600");
      inputPassword.current?.classList.remove("border-gray-400", "border-red-600");
      h6Password.current?.classList.remove("hidden");
      h6Password.current?.classList.add("text-yellow-600");
      setPasswordConfirmText("Password kurang kuat! Tambahkan huruf besar, angka, dan simbol.");
      setPasswordStatus(true);
    } else {
      inputPassword.current?.classList.add("border-gray-400");
      inputPassword.current?.classList.remove("border-red-600", "border-yellow-600");
      h6Password.current?.classList.add("hidden");
      h6Password.current?.classList.remove("text-yellow-600");
      setPasswordConfirmText("");
      setPasswordStatus(true);
    }

    // Validasi ulang konfirmasi password jika sudah ada isinya
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  // Validasi konfirmasi password
  const validateConfirmPassword = (value: string): boolean => {
    if (value !== password) {
      inputConfirmPassword.current?.classList.add("border-red-600");
      inputConfirmPassword.current?.classList.remove("border-gray-400");
      h6ConfirmPassword.current?.classList.remove("hidden");
      if (h6ConfirmPassword.current) {
        h6ConfirmPassword.current.textContent = "Password tidak cocok!";
      }
      return false;
    } else {
      inputConfirmPassword.current?.classList.add("border-gray-400");
      inputConfirmPassword.current?.classList.remove("border-red-600");
      h6ConfirmPassword.current?.classList.add("hidden");
      return true;
    }
  };

  // Handler submit yang disempurnakan
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validasi semua field terlebih dahulu
    await validateUsername(username);
    await validateEmail(email);
    validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    // Cek semua validasi
    if (usernameStatus && emailStatus && passwordStatus && isConfirmPasswordValid) {
      setIsLoading(true);
      try {
        await addDataUser(username, email, password);
        // Redirect ke halaman login atau sukses
        // router.push("/sign-in");
      } catch (error) {
        console.error("Error menambahkan pengguna:", error);
        // Tampilkan pesan error
        alert("Gagal mendaftar. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }
  };

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

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="username" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
                  Username :
                </label>
                <div ref={inputUsername} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
                  <div className="flex items-center justify-center pl-3">
                    <Image src={personWhite} alt="User icon" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="Username"
                    placeholder="Input your Username"
                    value={username}
                    onBlur={() => validateUsername(username)}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      validateUsername(e.target.value);
                    }}
                    autoComplete="username"
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
                    <Image src={mailWhite} alt="Email icon" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    placeholder="Input your Email"
                    value={email}
                    onBlur={() => validateEmail(email)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    autoComplete="email"
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
                    <Image src={lockWhite} alt="Lock icon" />
                  </div>
                  <input
                    type={eyeOpen ? "password" : "text"}
                    id="password"
                    name="password"
                    placeholder="Input your password"
                    value={password}
                    onBlur={() => validatePassword(password)}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    autoComplete="new-password"
                    className="w-full py-2 pl-1 ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
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

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="w-full mt-1">
                    <div className="flex gap-1 w-full h-1">
                      <div className={`h-full flex-1 rounded-full ${passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-full flex-1 rounded-full ${passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-full flex-1 rounded-full ${passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-full flex-1 rounded-full ${passwordStrength >= 4 ? 'bg-green-700' : 'bg-gray-300'}`}></div>
                    </div>
                    <p className="text-xs mt-1 text-light-silver">
                      {passwordStrength === 0 && "Sangat lemah"}
                      {passwordStrength === 1 && "Lemah"}
                      {passwordStrength === 2 && "Sedang"}
                      {passwordStrength === 3 && "Kuat"}
                      {passwordStrength === 4 && "Sangat kuat"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="confirmPassword" className="text-xs font-medium text-light-silver md:text-sm dark:text-black">
                  Konfirmasi Password :
                </label>
                <div ref={inputConfirmPassword} className="relative flex w-full border rounded-md border-independence bg-charcoal/50 focus-within:border-blue-500 transition-all">
                  <div className="flex items-center justify-center pl-3">
                    <Image src={lockWhite} alt="Lock icon" />
                  </div>
                  <input
                    type={eyeOpenConfirm ? "password" : "text"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Konfirmasi password Anda"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={(e) => validateConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full py-2 pl-1 ml-3 text-xs md:text-sm text-light-silver bg-transparent placeholder:text-gray-400 outline-none dark:text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setEyeOpenConfirm((prev) => !prev)}
                    className="flex items-center justify-center px-3"
                  >
                    {eyeOpenConfirm ? <Image src={eyeWhiteClose} alt="Hide password" /> : <Image src={eyeWhite} alt="Show password" />}
                  </button>
                </div>
                <h6 ref={h6ConfirmPassword} className="hidden text-xs text-red-600"></h6>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 mt-3 text-xs md:text-sm text-white bg-blue-500 rounded-lg dark:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : "Buat Akun"}
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