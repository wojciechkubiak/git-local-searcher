import styled from "styled-components";

interface IStyledButton {
  isActive: boolean;
}

const Button = styled.button<IStyledButton>`
  background-color: ${(props) => (props.isActive ? "#788b91" : "#cfd8dc")};
  color: ${(props) => (props.isActive ? "white" : "rgba(0, 0, 0, 0.42)")};
  border: none;
  margin-top: 4px;
  font-size: 20px;
  padding: 16px 16px;
  text-align: start;
`;

interface IListButton {
  onClick: () => void;
  text: string;
  isActive: boolean;
}

const ListButton = ({ onClick, text, isActive }: IListButton): JSX.Element => {
  return (
    <Button onClick={onClick} isActive={isActive}>
      {text}
    </Button>
  );
};

export default ListButton;
