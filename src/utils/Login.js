import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "~/store/firebase";
class Login {
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName: username, email } = result.user;
      const data = {
        username,
        email,
        gender: "",
        birthday: "",
        phone: "",
        bio: "",
        loginMethod: "google",
      };
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName: username, email } = result.user;
      const data = {
        username,
        email,
        gender: "",
        birthday: "",
        phone: "",
        bio: "",
        loginMethod: "facebook",
      };
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

const loginMethods = new Login();
export default loginMethods;
