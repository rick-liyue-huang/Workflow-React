import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

const LoginPage = () => {
  const { login, user } = useAuth();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? user.name : null}
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
