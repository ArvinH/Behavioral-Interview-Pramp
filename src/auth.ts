
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from './firebase';
const provider = new GoogleAuthProvider();

function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

interface HandleLoginStatus {
  loginButton: HTMLButtonElement | null;
  logoutButton: HTMLButtonElement | null;
}

function handleLoginStatus({ loginButton, logoutButton }: HandleLoginStatus) {
  const loginFunc = () => {
    login();
  };
  const logoutFunc = () => {
    auth.signOut().then(() => {
      provider.setCustomParameters({ prompt: 'select_account' });
    });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      loginButton && (loginButton.style.display = 'none');
      logoutButton && (logoutButton.style.display = 'block');
      logoutButton?.addEventListener("click", logoutFunc);
      loginButton?.removeEventListener("click", loginFunc);
    } else {
      // User is signed out
      loginButton && (loginButton.style.display = 'block');
      logoutButton && (logoutButton.style.display = 'none');
      logoutButton?.removeEventListener("click", logoutFunc);
      loginButton?.addEventListener("click", loginFunc);
    }
  });
}

export { login, auth, handleLoginStatus }
