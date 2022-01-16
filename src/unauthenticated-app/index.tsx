import React, { useState } from "react";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import RegisterPage from "./register";
import LoginPage from "./login";
import logo from "../assets/software-logo.svg";
import left from "../assets/left.gif";
import right from "../assets/right.gif";

export const UnauthenticatedApp = () => {
  // default as login status
  const [isRegister, setIsRegister] = useState(false);

  // config the error state on login
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Background />
      <StyledCard>
        <Title>{isRegister ? "Please Register" : "Please Login"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          Switch to {isRegister ? "Login" : "Register"}
        </Button>
      </StyledCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: steelblue;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const StyledCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
