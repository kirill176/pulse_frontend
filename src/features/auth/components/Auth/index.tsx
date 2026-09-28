import MainBg from "@icons/MainBg";
import AuthForm from "../AuthForm/AuthForm";
import GoogleButton from "../GoogleButton";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-wrapper">
        <GoogleButton />
        <span className="separator">or</span>
        <AuthForm />
      </div>
      <div className="bg-section">
        <MainBg />
      </div>
    </div>
  );
};

export default Auth;
