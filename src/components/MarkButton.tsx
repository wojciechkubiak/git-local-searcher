import styled from "styled-components";
import RoundButton from "./RoundButton";

interface IStyledButton {
  isActive: boolean;
}

const Button = styled.div<IStyledButton>`
  background-color: #cfd8dc;
  color: ${(props) => (props.isActive ? "rgba(0, 0, 0, 0.67)" : "rgba(0, 0, 0, 0.42)")};
  border: none;
  margin-top: 4px;
  font-size: 20px;
  padding: 16px 16px;
  text-align: start;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface IMarkButton {
  text: string;
  isActive: boolean;
}

const MarkButton = ({  text, isActive }: IMarkButton): JSX.Element => {
  return (
    <Button isActive={isActive}>
      <div>{text}</div>
      {isActive && <RoundButton isAdd={true} size={36}/>}
    </Button>
  );
};

export default MarkButton;
