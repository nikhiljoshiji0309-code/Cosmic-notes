importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAxbBOThZxG5W_R1i0zVmh-TxzWOE1uDhM",
  authDomain: "cosmic-notes-f7648.firebaseapp.com",
  projectId: "cosmic-notes-f7648",
  messagingSenderId: "70656136344",
  appId: "1:70656136344:web:640193b83f63cac569aced"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icon-192.png"
    }
  );
});
