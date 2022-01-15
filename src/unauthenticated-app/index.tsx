import React, { useState } from "react";
import { Card } from "antd";
import RegisterPage from "./register";
import LoginPage from "./login";

export const UnauthenticatedApp = () => {
  // default as login status
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterPage /> : <LoginPage />}
        <button onClick={() => setIsRegister(!isRegister)}>
          Switch to {isRegister ? "Login" : "Register"}
        </button>
      </Card>
    </div>
  );
};
