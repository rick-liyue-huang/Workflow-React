import React from "react";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import ProjectListPage from "./pages/project-list";
import { useAuth } from "./context/auth-context";
import { Row } from "./components/libs";
import Logo from "./assets/logo.jpeg";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <img src={Logo} alt="" width="70" />
          <h3>Project</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(evt) => evt.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Nav />
      <Main>
        <ProjectListPage />
      </Main>
      <Aside />
      <Footer />
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
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
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
