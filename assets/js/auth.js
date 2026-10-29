// Logic Wise Google sign-in using the existing Firebase web app.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdMkfK2rcMd7d0LMGGdAye06FisuhMZMA",
  authDomain: "logicwise-acdda.firebaseapp.com",
  projectId: "logicwise-acdda",
  storageBucket: "logicwise-acdda.firebasestorage.app",
  messagingSenderId: "457698966679",
  appId: "1:457698966679:web:f1970cb50c948da5c17dd2",
  measurementId: "G-1PJKQSCS3G"
};

const button = document.getElementById("google-account-btn");
if (button) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  let busy = false;

  function showMessage(message) {
    button.title = message;
    window.alert(message);
  }

  onAuthStateChanged(auth, user => {
    button.textContent = "Account";
    button.setAttribute("aria-label", user ? "Google account signed in" : "Continue to Google sign-in");
    button.title = user ? "Signed in with Google" : "Continue to Google sign-in";
  });

  getRedirectResult(auth).catch(error => {
    console.error("Google sign-in redirect error:", error);
    showMessage("Google sign-in could not be completed. Please try again. (" + error.code + ")");
  });

  button.addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    button.disabled = true;
    try {
      await signInWithRedirect(auth, provider);
      return;
    } catch (error) {
      console.error("Google sign-in error:", error);
      let message = "Could not sign in with Google. Please try again.";
      if (error.code === "auth/unauthorized-domain") {
        message = "This website domain is not authorized in Firebase Authentication. Add logicwise.in and www.logicwise.in under Firebase Console → Authentication → Settings → Authorized domains.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Google sign-in is not enabled yet. Enable Google under Firebase Console → Authentication → Sign-in method.";
      } else if (error.code === "auth/network-request-failed") {
        message = "Network error while signing in. Check your connection and try again.";
      }
      showMessage(message);
    } finally {
      busy = false;
      button.disabled = false;
    }
  });
}
