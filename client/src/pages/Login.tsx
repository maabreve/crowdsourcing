import GoogleButton from "react-google-button";

const Login = () => {
  const loginGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="center-container">
      <GoogleButton onClick={loginGoogle} />
    </div>
  );
};

export default Login;
