import styled from "styled-components";

import { useAppSelector } from "../store/store";
import Navbar from "../components/Navbar";
import LeftBar from "./LeftBar";
import Search from "./Search";
import Repo from "./Repo";
import { Item } from "../models/Data";

const Body = styled.div`
  position: relative;
  height: calc(100% - 64px);
`;

const Page = (): JSX.Element => {
  const currentRepo: {item: Item | null, isLocal: boolean} = useAppSelector(
    (state) => state.data.currentRepo
  );

  return (
    <>
      <Navbar />
      <Body>
        <LeftBar />
        {currentRepo.item ? <Repo currentRepo={currentRepo.item} isLocal={currentRepo.isLocal}/> : <Search/>}
      </Body>
    </>
  );
};

export default Page;
