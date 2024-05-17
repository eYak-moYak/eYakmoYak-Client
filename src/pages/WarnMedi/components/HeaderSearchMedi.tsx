import styled from "styled-components";
import AutoCompleteSearch from "../../../components/Common/AutoMediInput";

type Props = {};

const HeaderSearchMedi = (props: Props) => {
  return (
    <HeaderSearchContainer>
      <AutoCompleteSearch />
    </HeaderSearchContainer>
  );
};

export default HeaderSearchMedi;

const HeaderSearchContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 20rem;
`;
