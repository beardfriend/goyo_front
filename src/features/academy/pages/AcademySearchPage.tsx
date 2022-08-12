import { useAppDispatch } from '@Apps/store';
import styled from '@emotion/styled/macro';
import { commonState } from '@Features/common/slices/CommonSlice';
import mq from '@Libs/theme/mediaQuery';
import MobileHeader from '@Shared/layout/header/components/MobileHeader';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchDataList from '../components/SearchDataList';
import SearchFocusInput from '../components/SearchFocusInput';
import SearchInput, { SearchInputWrapper } from '../components/SearchInput';
import {
  categoryState,
  GET_CATEGORY,
  setSearchKeyword,
  setSearchListResponse
} from '../slices/AcademyListPageSlice';

function AcademySearchPage() {
  const dispatch = useAppDispatch();
  const data = useSelector(categoryState);
  const navigate = useNavigate();
  const commonData = useSelector(commonState);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    dispatch(setSearchListResponse([]));
    if (data.query.keyword.length === 0) {
      return;
    }
    dispatch(GET_CATEGORY(data.query.keyword));
  }, [data.query.keyword]);

  const [isListShow, setIsListShow] = useState(false);

  function onChangeInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(setSearchKeyword(e.currentTarget.value));
    if (e.currentTarget.value.length > 0) {
      setIsListShow(true);
      return;
    }
    setIsListShow(false);
  }

  function handleClick(e: React.FormEvent<HTMLButtonElement>) {
    if (data.query.keyword) {
      navigate(`/${data.query.keyword}`);
    }

    dispatch(setSearchKeyword(''));
    setIsListShow(false);
  }

  function RecommendKeyWordClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const text = e.currentTarget.textContent;
    navigate(`/${text}`);
    dispatch(setSearchKeyword(''));
    setIsListShow(false);
  }

  function onChangeFocus(e: React.FormEvent<HTMLInputElement>) {
    if (commonData.isMobile) {
      setIsFocus(true);
    }
  }
  function onClickBackSpace(e: React.FormEvent<HTMLInputElement>) {
    setIsFocus(false);
    setIsListShow(false);
    dispatch(setSearchKeyword(''));
  }

  function searchClick(e: React.FormEvent<HTMLButtonElement>) {
    const text = e.currentTarget.textContent;

    if (data.query.keyword) {
      navigate(`/${data.query.keyword}`);
    }
    if (text) {
      navigate(`/${text}`);
    }
    dispatch(setSearchKeyword(''));
  }

  if (commonData.isMobile && isFocus) {
    return (
      <Container>
        <SearchFocusInput
          value={data.query.keyword}
          placeholder='검색어를 입력해주세요'
          onClick={onClickBackSpace}
          searchClick={searchClick}
          isListShow={isListShow}
          onChange={onChangeInput}
        />
        <SearchDataList
          isShow={isListShow}
          datas={data.responseData}
          onClick={RecommendKeyWordClick}
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
          onClick={handleClick}
          onFocus={onChangeFocus}
          value={data.query.keyword}
          placeholder='검색어를 입력해주세요'
          isListShow={isListShow}
          onChange={onChangeInput}
        />
        <SearchDataList
          isShow={isListShow}
          datas={data.responseData}
          onClick={RecommendKeyWordClick}
        />
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

export default AcademySearchPage;
