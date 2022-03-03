import { useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchData } from "../store/data/actions";
import {
  addRepo,
  addSearch,
  CurrentOption,
  parseTechnologyData,
  setOption,
} from "../store/data/slice";
import ErrorMsg from "../components/Error";
import SearchInput from "../components/SearchInput";
import FlatButton from "../components/FlatButton";
import { AiFillGithub, AiOutlineRight } from "react-icons/ai";


const ReposBody = styled.div`
  position: relative;
  width: 98%;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding-top: 42px;
`;

const ReposList = styled.div`
  margin-top: 52px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 500px;
`;

const ReposListElement = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #cfd8dc;
  margin-top: 2px;
  border: none;
  outline: none;

  & > svg {
    margin-right: 12px;
  }
`;

const ReposName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > svg {
    margin-right: 12px;
  }

  & > h3 {
    color: #868686;
  }
`;

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.data);
  const currentTechnology = useAppSelector(
    (state) => state.technologies.currentTechnology
  );

  const handleTextChange = (value: string) => dispatch(addSearch(value));
  const handleSearchOption = (value: CurrentOption) => dispatch(setOption(value));

  useEffect(() => {
    if (currentTechnology && data.search.length > 2) {
      dispatch(
        parseTechnologyData({
          search: data.search,
          technology: currentTechnology,
        })
      );

      if (data.option === CurrentOption.repo) {
        dispatch(fetchData({ id: data.search, technology: currentTechnology }));
      } 
    }
  }, [dispatch, currentTechnology, data.search, data.option]);

  return (
    <ReposBody>
      <SearchHeader>
        <SearchInput
          onChange={handleTextChange}
          value={data.search}
          placeholder="Search"
        />
        <FlatButton
          onClick={() => handleSearchOption(CurrentOption.repo)}
          text="IN GITHUB"
          isActive={data.option === CurrentOption.repo}
        />
        <FlatButton
          onClick={() => handleSearchOption(CurrentOption.local)}
          text="IN SAVED"
          isActive={data.option === CurrentOption.local}
        />
      </SearchHeader>
      <ReposList>
        {data.error && <ErrorMsg text={data.error} />}
        {(data.option === CurrentOption.repo
          ? data.data?.items
          : data.localData
        )?.map((item) => (
          <ReposListElement
            onClick={() => {
              dispatch(
                addRepo({
                  item: item,
                  isLocal: data.option === CurrentOption.local,
                })
              );
            }}
          >
            <ReposName>
              <AiFillGithub size={64} color="white" />
              <h3>{item.fullName}</h3>
            </ReposName>
            <AiOutlineRight size={22} />
          </ReposListElement>
        ))}
      </ReposList>
    </ReposBody>
  );
};

export default Search;
