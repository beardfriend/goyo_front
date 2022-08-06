import styled from '@emotion/styled/macro';
import MobileHeader from '@Shared/layout/header/components/MobileHeader';
import SearchInput, { InputWrapper } from '../components/SearchInput';

function AcademyListPage() {
  return (
    <Container>
      <MobileHeader />
      <MainWrapper>
        <Banner>하고 싶은 요가를 검색해보세요.</Banner>
        <SearchInput placeholder='검색어를 입력해주세요' />
      </MainWrapper>
    </Container>
  );
}

const MainWrapper = styled.div`
  padding: 0 6rem;
  margin-top: 9.8rem;
  ${InputWrapper} {
    margin-top: 7rem;
  }
`;

const Banner = styled.div`
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
`;

const Container = styled.div`
  background: white;
`;

export default AcademyListPage;
