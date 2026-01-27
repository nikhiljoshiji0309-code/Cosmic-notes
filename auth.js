import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, setDoc, getDocs, collection, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.signup = async function () {
  const email = email.value;
  const password = password.value;
  const username = username.value.toLowerCase();

  if (!email || !password || !username) {
    alert("Fill all fields");
    return;
  }

  // Check username uniqueness
  const q = query(collection(db, "users"), where("username", "==", username));
  const snap = await getDocs(q);
  if (!snap.empty) {
    alert("Username already taken");
    return;
  }

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    username,
    email,
    createdAt: Date.now()
  });

  location.href = "home.html";
};

window.login = async function () {
  await signInWithEmailAndPassword(auth, email.value, password.value);
  location.href = "home.html";
};

window.googleLogin = async function () {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);

  const userRef = doc(db, "users", cred.user.uid);
  await setDoc(userRef, {
    username: cred.user.displayName.replace(/\s/g,"").toLowerCase(),
    email: cred.user.email,
    createdAt: Date.now()
  }, { merge: true });

  location.href = "home.html";
};
