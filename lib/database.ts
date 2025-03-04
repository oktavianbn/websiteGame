import { db } from "./firebase";
import { ref, set, push, onValue } from "firebase/database";
import bcrypt from "bcryptjs";

// Fungsi untuk Menulis Data (Menambahkan User)
export function addDataUser(username: string, password: string) {
  const userRef = ref(db, "users"); // Referensi ke "users/"
  const newUserRef = push(userRef); // Buat ID unik secara otomatis

  set(newUserRef, {
    username,
    password:bcrypt.hashSync(password, 10),
  })
    .then(() => console.log("User berhasil ditambahkan!"))
    .catch((error) => console.error("Gagal menambahkan user:", error));
}

//  Fungsi untuk Membaca Data secara Realtime
export function getUsersRealtime(callback: (data: any) => void) {
  const userRef = ref(db, "users");

  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
