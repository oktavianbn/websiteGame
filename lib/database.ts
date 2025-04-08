/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./firebase";
import { ref, set, push, onValue, get, child, serverTimestamp, orderByChild, equalTo, query } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";

// Fungsi untuk Menulis Data (Menambahkan User)
/*export async function addNewDataUser(username: string, email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = push(ref(db, '/users'));

    await set(userRef, {
      uid: user.uid,
      username: username,
      email: email,
      createAt: serverTimestamp()
    });
    return { success: true, uid: user.uid };
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error 001 BE: ${error.message}`);
    } else {
      alert('An unknown error occurred BE');
    }
  }
}*/

export const addNewDataUser = async (username: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'user', user.uid), {
    uid: user.uid,
    username: username,
    email: email,
    createAt: serverTimestamp()
  });
}

// Fungsi untuk Mencari User Bedasarkan Email&/Username 
/*export async function findUser(key: "email" | "username", value: string) {
  if (key)
    try {
      const usersRef = ref(db, 'users');
      const queryRef = query(usersRef, orderByChild(key), equalTo(value));

      const snapshot = await get(queryRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = Object.keys(users)[0];

        return {
          found: true,
          userData: users[userId]
        };
      }

      return {
        found: false,
        userData: null
      };
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error 002 BE: ${error.message}`);
      } else {
        alert('An unknown error occurred BE');
      }
    }*/

