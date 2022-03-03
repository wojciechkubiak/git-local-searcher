import { AiOutlineLeft } from "react-icons/ai";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../store/store";
import { clearRepo, addLocalRepo } from "../store/data/slice";
import RoundButton from "../components/RoundButton";
import { Item } from "../models/Data";
import MarkButton from "../components/MarkButton";
import { useEffect, useState } from "react";

const ReposBody = styled.div`
  position: relative;
  width: 94%;
  left: 50%;
  transform: translateX(-50%);
`;

const ReposHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 42px;
`;

const RepoInfo = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OwnerData = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 42px;

  & > div {
    text-align: start;
  }

  & > div > h2,
  > div > a {
    margin: 0 !important;
    margin-left: 22px !important;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
`;

const Image = styled.img`
  height: 112px;
  width: 112px;
  border-radius: 50%;
`;

const TechnologiesList = styled.div`
  min-height: 50px;
  max-height: 800px;
  width: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const RepoDescription = styled.div`
  display: flex;
  flex-direction: column;

  & > h1,
  h2 {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    text-align: start;
    margin: 8px 0 !important;
  }
`;

interface IRepo {
  currentRepo: Item;
  isLocal: boolean;
}

const Repo = ({ currentRepo, isLocal }: IRepo) => {
  const dispatch = useAppDispatch();

  const technologies: string[] = useAppSelector(
    (state) => state.technologies.technologies
  );
  const localData: Item[] = useAppSelector((state) => state.data.localData);

  const handleDate = (date: string): string => {
    let d: Date = new Date(date);

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const [isAdded, setIsAdded] = useState<boolean>(isLocal);

  useEffect(() => {
    if (!isLocal) {
      const id = localData.findIndex((data) => data.id === currentRepo.id);
      if (id > -1) {
        setIsAdded(true);
      }
    }
  }, [localData, isLocal, currentRepo.id]);

  return (
    <ReposBody>
      <ReposHeader>
        <AiOutlineLeft
          size={42}
          onClick={() => dispatch(clearRepo())}
          color="#868686"
        />
        {!isAdded && (
          <RoundButton
            onClick={() => {
              const id = localData.findIndex(
                (data) => data.id === currentRepo.id
              );
              if (id === -1) {
                dispatch(
                  addLocalRepo({
                    technology: currentRepo.language.toLocaleLowerCase(),
                    items: JSON.stringify([...localData, currentRepo]),
                  })
                );

                setIsAdded(true);
              }
            }}
            isAdd={false}
          />
        )}
      </ReposHeader>
      <RepoInfo>
        <div>
          <OwnerData>
            <Image
              src={currentRepo.owner?.avatarUrl}
              alt={currentRepo.fullName}
            />
            <div>
              <h2>{currentRepo.owner?.login}</h2>
              <a href={currentRepo.owner?.url}>Link</a>
            </div>
          </OwnerData>
          <RepoDescription>
            <h1>
              {currentRepo.fullName.replaceAll(
                `${currentRepo.owner?.login}/`,
                ""
              )}
            </h1>
            <h2>Created at: {handleDate(currentRepo.createdAt)}</h2>
            <h2>Language: {currentRepo.language}</h2>
          </RepoDescription>
        </div>
        <TechnologiesList>
          {technologies?.map((technology) => (
            <MarkButton
              key={uuidv4()}
              text={technology}
              isActive={
                technology.toLowerCase() === currentRepo.language.toLowerCase()
              }
            />
          ))}
        </TechnologiesList>
      </RepoInfo>
    </ReposBody>
  );
};

export default Repo;
