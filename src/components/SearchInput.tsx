import styled from "styled-components";

const Input = styled.input`
  background-color: #EBEBEB;
  border: none;
  margin-top: 4px;
  font-size: 18px;
  padding: 0 46px;
  height: 62px;
  width: 98%;
  margin-right: 4px;
  border: 1px solid transparent;

  &:focus,
  :active {
    border: 1px solid gray;
    box-shadow: none;
    outline: none;
  }
 `

interface ISearchInput {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const SearchInput = ({ onChange, value, placeholder }: ISearchInput) => (
  <Input
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    value={value}
  />
);

export default SearchInput;
