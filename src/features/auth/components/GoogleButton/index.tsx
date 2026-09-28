import Button from "@components/Button";
import GoogleIcon from "@icons/GoogleIcon";
import "./GoogleButton.css";

const GoogleButton = () => {
  return (
    <Button type="button" className="google-button">
      <GoogleIcon /> Continue with Google
    </Button>
  );
};

export default GoogleButton;
