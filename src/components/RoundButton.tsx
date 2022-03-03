import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

interface IStyledButton {
  size?: number;
}

const Button = styled.button<IStyledButton>`
  color: white;
  background-color: #868686;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border: none;
  border-radius: 42px;
`;

interface IRoundButton {
  onClick?: () => void;
  isAdd: boolean;
  size?: number;
}

const RoundButton = ({ onClick, isAdd, size = 56}: IRoundButton): JSX.Element => (
  <Button onClick={onClick} size={size}>
    {isAdd ? <AiOutlineClose size={size - 18} /> : <AiOutlinePlus size={size - 18} />}
  </Button>
);

export default RoundButton;
