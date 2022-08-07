import { useEffect, useState } from 'react';
import GoyoApi from '@Shared/api/goyo';
import styled from '@emotion/styled/macro';
import MobileHeader from '@Shared/layout/header/components/MobileHeader';
import SearchDataList from '../components/SearchDataList';
import SearchInput, { SearchInputWrapper } from '../components/SearchInput';
import { useSelector } from 'react-redux';
import {
  categoryState,
  GET_CATEGORY,
  setSearchKeyword
} from '../slices/AcademyListPageSlice';
import { useAppDispatch } from '@Apps/store';

function AcademyListPage() {
  const dispatch = useAppDispatch();
  const data = useSelector(categoryState);
  useEffect(() => {
    if (data.query.keyword.length === 0) {
      return;
    }
    dispatch(GET_CATEGORY(data.query.keyword));
  }, [data.query.keyword]);

  const [isListShow, setIsListShow] = useState(false);

  function onChangeInput(e) {
    e.preventDefault();
    if (e.currentTarget.value.length > 0) {
      setIsListShow(true);
      dispatch(setSearchKeyword(e.currentTarget.value));
      return;
    }
    setIsListShow(false);
  }
  return (
    <Container>
      <MobileHeader />
      <MainWrapper>
        <Banner>하고 싶은 요가를 검색해보세요.</Banner>
        <SearchInput
          placeholder='검색어를 입력해주세요'
          isListShow={isListShow}
          onChange={onChangeInput}
        />
        <SearchDataList isShow={isListShow} datas={data.data} />
      </MainWrapper>
    </Container>
  );
}

const MainWrapper = styled.div`
  padding: 0 6rem;
  margin-top: 9.8rem;
  ${SearchInputWrapper} {
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
