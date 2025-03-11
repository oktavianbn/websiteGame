import { db } from "./firebase";
import { ref, set, push, onValue, get, child } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Fungsi untuk Menulis Data (Menambahkan User)
export async function addDataUser(username: string, email: string, password: string): Promise<void> {
  try {
    // Buat akun dengan email & password di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan username & email ke Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, { username, email });

    console.log("User berhasil ditambahkan ke database!");
  } catch (error) {
    console.log("Gagal membuat user:", error);
  }
}

export async function getAllUsers() {
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, "users"));

    if (snapshot.exists()) {
      const users = snapshot.val();
      const userList = [];

      // Loop melalui semua user untuk mengambil username dan email
      for (const key in users) {
        userList.push({
          username: users[key].username,
          email: users[key].email,
        });
      }

      console.log("Data semua user:", userList);
      return userList; // Mengembalikan daftar user
    } else {
      console.log("Database user masih kosong.");
      return [];
    }
  } catch (error) {
    console.error("Error saat mengambil data user:", error);
    return [];
  }
}

export async function findUser(key: "email" | "username", value: string): Promise<any | null> {
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, "users"));

    if (snapshot.exists()) {
      const users = snapshot.val();

      for (const userId in users) {
        if (users[userId][key] === value) {
          console.log(`User dengan ${key} "${value}" ditemukan.`);
          return users[userId];
        }
      }

      console.log(`User dengan ${key} "${value}" tidak ditemukan.`);
      return null;
    } else {
      console.log("Database user masih kosong.");
      return null;
    }
  } catch (error) {
    console.error("Error saat mencari user:", error);
    return null;
  }
}
