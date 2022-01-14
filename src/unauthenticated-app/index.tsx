import React, { useState } from "react";
import RegisterPage from "./register";
import LoginPage from "./login";

export const UnauthenticatedApp = () => {
  // default as login status
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
};
