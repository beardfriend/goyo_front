import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import MobileHeader from '@Shared/layout/header/components/MobileHeader';
import SearchDataList from '../components/SearchDataList';
import SearchInput, { SearchInputWrapper } from '../components/SearchInput';
import { useSelector } from 'react-redux';
import {
  categoryState,
  listState,
  GET_CATEGORY,
  GET_LIST,
  setKeywordResponse,
  setSearchKeyword
} from '../slices/AcademyListPageSlice';
import { useAppDispatch } from '@Apps/store';
import DataList, { ListContainer } from '../components/DataList';
import mq from '@Libs/theme/mediaQuery';
import { commonState } from '@Features/common/slices/CommonSlice';
import SearchFocusInput from '../components/SearchFocusInput';

function AcademyListPage() {
  const dispatch = useAppDispatch();
  const data = useSelector(categoryState);
  const listData = useSelector(listState);
  const commonData = useSelector(commonState);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (data.query.keyword.length === 0) {
      return;
    }
    dispatch(GET_CATEGORY(data.query.keyword));
  }, [data.query.keyword]);

  const [isListShow, setIsListShow] = useState(false);

  function onChangeInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e);
    dispatch(setSearchKeyword(e.currentTarget.value));
    if (e.currentTarget.value.length > 0) {
      setIsListShow(true);
      return;
    }
    setIsListShow(false);
  }

  function handleClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const text = e.currentTarget.textContent;
    if (text !== null) {
      dispatch(GET_LIST(text));
    }
    dispatch(setKeywordResponse([]));
    dispatch(setSearchKeyword(''));

    setIsListShow(false);
  }

  function onChangeFocus(e: React.FormEvent<HTMLInputElement>) {
    if (commonData.isMobile) {
      setIsFocus(true);
    }
  }
  function onClickBackSpace(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.focus();
    setIsFocus(false);
    setIsListShow(false);
    dispatch(setSearchKeyword(''));
  }

  if (commonData.isMobile && isFocus) {
    return (
      <Container>
        <SearchFocusInput
          value={data.query.keyword}
          placeholder='검색어를 입력해주세요'
          onClick={onClickBackSpace}
          isListShow={isListShow}
          onChange={onChangeInput}
        />
        <SearchDataList
          isShow={isListShow}
          datas={data.responseData}
          onClick={handleClick}
        />
      </Container>
    );
  }

  return (
    <Container>
      <MobileHeader />
      <MainWrapper>
        <Banner>하고 싶은 요가를 검색해보세요.</Banner>
        <SearchInput
          onFocus={onChangeFocus}
          value={data.query.keyword}
          placeholder='검색어를 입력해주세요'
          isListShow={isListShow}
          onChange={onChangeInput}
        />
        <SearchDataList
          isShow={isListShow}
          datas={data.responseData}
          onClick={handleClick}
        />

        <DataListWrapper>
          <DataList data={listData.responseData} />
        </DataListWrapper>
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
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const Banner = styled.div`
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  ${mq[0]} {
    font-size: 2rem;
    padding: 0 1rem;
  }
`;

const Container = styled.div`
  background: white;
`;

const DataListWrapper = styled.div`
  ${ListContainer} {
    margin-top: 2rem;
  }
`;

export default AcademyListPage;
