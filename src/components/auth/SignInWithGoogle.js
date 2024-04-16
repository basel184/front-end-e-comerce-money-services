import { useContext, useState } from "react";
import { auth, provider } from "@/src/FirebaseAuth/config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { GoogleLoginButton } from "react-social-login-buttons";
import { tokenContext } from "@/src/app/Context/tokenContext";
import { useRouter } from "@/src/utils/navigation";

function SignInWithGoogle() {
  let { setToken } = useContext(tokenContext);
  const router = useRouter();
  const [loginErr, setLoginErr] = useState(null);

  async function loginWithBackend(user, token) {
    console.log("inside Login With BackEnd");
    console.log(user);
    console.log(token);
    try {
      const response = await axios.post(
        `https://moneyservices.store/back/public/api/login_api?name=${user.name}&email=${user.email}&provider_id=${user.provider_id}&provider=${user.provider}`,
        {}
      );
      console.log("Response:", response.data);
      setToken(response.data.authorisation.token);

      localStorage.setItem(
        "token",
        JSON.stringify(response.data.authorisation.token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      //console.log(response.data.authorisation.token);
      //console.log(response.data.user);
      setLoginErr(false);
      router.push("/");
    } catch (error) {
      setLoginErr(true);
      console.error("Error:", error);
    }
  }
  function handleClick() {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("GoogleData ", data);
        loginWithBackend(
          {
            name: data.user.displayName,
            email: data.user.email,
            provider_id: data.user.uid,
            provider: "google",
          },
          data.user.accessToken
        );
      })
      .catch((err) => {
        setLoginErr(true);
        console.log(err);
        console.log("HERE IN THE CATCH BLOCK");
      });
  }
  console.log(loginErr);
  return (
    <div>
      {loginErr ? (
        <p style={{ color: "red" }}>Login Error Please Try Again Later</p>
      ) : (
        ""
      )}
      <GoogleLoginButton onClick={handleClick} />
    </div>
  );
}

export default SignInWithGoogle;
