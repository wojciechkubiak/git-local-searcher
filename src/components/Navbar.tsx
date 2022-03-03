import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 40px;
  background: rgb(62, 74, 165);
  background: linear-gradient(
    90deg,
    rgba(62, 74, 165, 1) 0%,
    rgba(44, 43, 157, 1) 35%,
    rgba(44, 43, 157, 1) 100%
  );
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  & * {
    margin-left: 12px;
    margin-right: 12px;
  }
`;

const Logo = styled.h1`
  color: white;
`;

const Navbar = (): JSX.Element => (
  <Nav>
    <Logo>Git repos</Logo>
    <AiFillGithub size={44} color="white" />
  </Nav>
);

export default Navbar;
