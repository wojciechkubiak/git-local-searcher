import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  width: 98%;
  height: 95vh;
  min-height: 800px;
  margin-top: 24px;
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => (
  <Container>
    <Body>{children}</Body>
  </Container>
);
export default Layout;
