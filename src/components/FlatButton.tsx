import styled from "styled-components";

interface IButtonStyled {
  isActive: boolean;
}

const Button = styled.button<IButtonStyled>`
  background-color: ${(props) => (props.isActive ? "#788b91" : "#cfd8dc")};
  color: ${(props) => (props.isActive ? "white" : "rgba(0, 0, 0, 0.42)")};
  border: none;
  margin-top: 4px;
  font-size: 18px;
  height: 62px;
  width: 300px;
`;

interface IFlatButton {
  onClick: () => void;
  text: string;
  isActive: boolean;
}

const FlatButton = ({ onClick, text, isActive }: IFlatButton) => (
  <Button onClick={onClick} isActive={isActive}>
    {text}
  </Button>
);

export default FlatButton;
