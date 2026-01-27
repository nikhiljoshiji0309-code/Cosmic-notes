import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const feed = document.getElementById("feed");
let currentUser = null;

onAuthStateChanged(auth, user => {
  if (!user) {
    location.href = "index.html";
  } else {
    currentUser = user;
    loadFeed();
  }
});

function loadFeed() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, snap => {
    feed.innerHTML = "";
    snap.forEach(doc => {
      const post = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <div class="username">@${post.username}</div>
        <div>${post.text}</div>
      `;
      feed.appendChild(div);
    });
  });
}

window.openPost = async () => {
  const text = prompt("Write your thought");
  if (!text) return;

  await addDoc(collection(db, "posts"), {
    text,
    userId: currentUser.uid,
    username: currentUser.email.split("@")[0],
    createdAt: Date.now()
  });
};
