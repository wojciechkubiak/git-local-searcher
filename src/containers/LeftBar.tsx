import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../store/store";
import RoundButton from "../components/RoundButton";
import ListButton from "../components/ListButton";
import {
  addTechnology,
  setCurrentTechnology,
} from "../store/technologies/slice";
import { clearData, clearRepo } from "../store/data/slice";

const LeftBarBody = styled.div`
  position: relative;
  float: left;
  min-width: 400px;
  height: 100%;
  background-color: #e5e5e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const TechnologiesList = styled.div`
  min-height: 50px;
  max-height: 800px;
  width: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const TechnologyAdd = styled.div`
  width: 380px;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  width: 80%;
`;

const TextButton = styled.button`
  background-color: transparent;
  font-size: 24px;
  border: none;
  color: #646464;
  height: 44px;
  width: 44px;
`;

const InputField = styled.input`
  font-size: 20px;
  padding: 0 16px;
  height: 42px;
  border: none;
  border: 1px solid transparent;
  width: 200px;

  &:focus,
  :active {
    border: 1px solid gray;
    box-shadow: none;
    outline: none;
  }
`;

const LeftBar = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const technologies: string[] = useAppSelector(
    (state) => state.technologies.technologies
  );
  const currentTechnology: string = useAppSelector(
    (state) => state.technologies.currentTechnology
  );

  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleVisibility = () => setIsInputVisible(!isInputVisible);

  useEffect(() => {
    if (!currentTechnology) {
      dispatch(setCurrentTechnology(technologies[0]));
    }
  }, [dispatch, technologies, currentTechnology]);

  return (
    <LeftBarBody>
      <TechnologiesList>
        {technologies?.map((technology) => (
          <ListButton
            key={uuidv4()}
            onClick={() => {
              dispatch(setCurrentTechnology(technology));
              dispatch(clearData());
              dispatch(clearRepo());
            }}
            text={technology}
            isActive={technology === currentTechnology}
          />
        ))}
      </TechnologiesList>
      <TechnologyAdd>
        <RoundButton isAdd={isInputVisible} onClick={handleVisibility} />
        {isInputVisible && (
          <InputContainer>
            <InputField
              placeholder="Add new language"
              onChange={(event) => setInputValue(event.target.value)}
            />
            <TextButton
              onClick={() => {
                dispatch(addTechnology(inputValue));
                handleVisibility();
                setInputValue("");
              }}
            >
              <AiOutlinePlus size={22} />
            </TextButton>
          </InputContainer>
        )}
      </TechnologyAdd>
    </LeftBarBody>
  );
};

export default LeftBar;
