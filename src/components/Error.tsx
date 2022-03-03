import styled from "styled-components";

const ErrorText = styled.p`
    color: #F07474;
    margin: 0 !important;
    padding-top: 12px;
`

interface IErrorMsg {
    text: string
}

const ErrorMsg = ({text}: IErrorMsg) : JSX.Element => <ErrorText>{text}</ErrorText>

export default ErrorMsg;