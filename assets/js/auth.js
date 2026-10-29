// Logic Wise Google sign-in using the existing Firebase web app.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
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

  const defaultButtonMarkup = button.innerHTML;
  let currentUser = null;
  let busy = false;

  function showMessage(message) {
    button.title = message;
    window.alert(message);
  }

  onAuthStateChanged(auth, user => {
    currentUser = user;
    if (user) {
      const name = (user.displayName || user.email || "Account").split(" ")[0];
      button.textContent = "Hi, " + name;
      button.setAttribute("aria-label", "Signed in as " + (user.displayName || user.email) + ". Click to sign out.");
      button.title = "Signed in with Google. Click to sign out.";
    } else {
      button.innerHTML = defaultButtonMarkup;
      button.setAttribute("aria-label", "Create an account or continue with Google");
      button.title = "Create an account or continue with Google";
    }
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
      if (currentUser) {
        await signOut(auth);
        return;
      }
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        if (error.code === "auth/popup-blocked" || error.code === "auth/popup closed by user") {
          await signInWithRedirect(auth, provider);
          return;
        }
        throw error;
      }
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
