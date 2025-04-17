/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, collection, query, where, getDocs, serverTimestamp, doc, setDoc } from "firebase/firestore";

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

const checkUsername = async (username: string) => {
  const q = query(collection(db, "user"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const checkEmail = async (email: string) => {
  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; 
};

export const addNewDataUser = async (username: string, email: string, password: string) => {
  try {
    const [isUsernameUsed, isEmailUsed] = await Promise.all([
      checkUsername(username),
      checkEmail(email)
    ]);

    if (isUsernameUsed) {
      console.log("Username sudah dipakai!");
      return { find: false, error: "username-exists" };
    }

    if (isEmailUsed) {
      console.log("Email sudah dipakai (di firestore)!");
      return { find: false, error: "email-exists" };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log(" User created:", user.email);

    await setDoc(doc(db, "user", user.uid), {
      uid: user.uid,
      username: username,
      email: email,
      createdAt: serverTimestamp()
    });

    return { find: true };

  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Email sudah dipakai (di auth)!");
      return { find: false, error: "email-auth-exists" };
    }

    console.log("🔥 Error saat membuat akun:", error.message);
    return { find: false, error: "unknown-error" };
  }
};

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

