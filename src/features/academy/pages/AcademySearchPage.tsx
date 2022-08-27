import { useAppDispatch } from '@Apps/store';
import styled from '@emotion/styled/macro';
import mq from '@Libs/theme/mediaQuery';
import MobileHeader from '@Shared/layout/header/components/MobileHeader';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RankingList from '../components/RankingList';
import { SearchInputWrapper } from '../components/SearchInput';
import SearchContainer from '../containers/SearchContainer';
import { GET_RANKING, rankingState } from '../slices/AcademyListPageSlice';
import { academySearchState } from '../slices/AcadmeySearchPageSlice';

function AcademySearchPage() {
  const dispatch = useAppDispatch();
  const rankingData = useSelector(rankingState);
  const searchData = useSelector(academySearchState);

  useEffect(() => {
    dispatch(GET_RANKING());
  }, []);

  if (searchData.isFocus) {
    return (
      <Container>
        <SearchContainer />
      </Container>
    );
  }

  return (
    <Container>
      <MobileHeader />
      <MainWrapper>
        <Banner>하고 싶은 요가를 검색해보세요 :)</Banner>
        <SearchContainer />
        <RankingList datas={rankingData.responseData} />
      </MainWrapper>
    </Container>
  );
}

const MainWrapper = styled.div`
  height: 100%;
  padding: 0 10rem;
  margin-top: 9.8rem;

  ${SearchInputWrapper} {
    margin-top: 2rem;
  }
  ${mq[0]} {
    padding: 0 2rem;
  }
`;

const Banner = styled.div`
  font-weight: 900;
  font-size: 2.5rem;
  text-align: center;
  ${mq[0]} {
    font-size: 1.5rem;
    padding: 0 1rem;
  }
`;

const Container = styled.div`
  background: white;
`;

export default AcademySearchPage;
