import React from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import ProjectListPage from "./pages/project-list";
import { useAuth } from "./context/auth-context";
import { Row } from "./components/libs";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>Project</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>Logout</Button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListPage />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 2rem 1fr 2rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  width: 100vw;
  height: 100vh;
  grid-gap: 3rem;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
