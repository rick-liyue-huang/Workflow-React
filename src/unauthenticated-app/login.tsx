import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";

const LoginPage = () => {
  const { login, user } = useAuth();

  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input username" }]}
      >
        <Input type="text" id="username" placeholder={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "need password" }]}
      >
        <Input type="password" id="password" placeholder={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );

  /*
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  */
  /*
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
  );*/
};

export default LoginPage;
