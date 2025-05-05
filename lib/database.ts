/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { collection, query, where, getDocs, serverTimestamp, doc, setDoc, addDoc } from "firebase/firestore";

// Memeriksa User
export async function findUser(key: "email" | "username", value: string, password: string) {
  try {
    let emailToUse = "";

    if (key === "email") {
      emailToUse = value;
    } else if (key === "username") {
      const q = query(collection(db, "user"), where("username", "==", value));
      const snap = await getDocs(q);

      if (snap.empty) {
        console.log("User tidak ditemukan.");
        return { found: false, error: "user-not-found" };
      }
      emailToUse = snap.docs[0].data().email;
    }

    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    return { found: true, user: userCredential.user };

  } catch (error: any) {
    console.error("Login error:", error.message);
    return { found: false, error: error.code || "unknown-error" };
  }
}


//  Fungsi untuk pembuatan akun
export async function addNewDataUser(username: string, email: string, password: string) {
  try {
    const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
    await setDoc(doc(db, "user", user.uid), {
      uid: user.uid,
      username,
      email,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.log("Eror BE: Create User Func");
  }
}

// 
export const checkUser = async (key: "email" | "username", value: string) => {
  if (key) {
    try {
      const q = query(collection(db, "user"), where(key, "==", value));
      const snap = await getDocs(q);
      if (snap.empty === true) {
        return { found: true }
        // dok kosong
      } else {
        return { found: false }
        // dok ada
      }
    } catch (error) {
      console.log("Eror BE: Check User Func");
      return { found: false }
    }
  }
}