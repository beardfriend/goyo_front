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
import DataList from '../components/DataList';

function AcademyListPage() {
  const dispatch = useAppDispatch();
  const data = useSelector(categoryState);
  const listData = useSelector(listState);
  useEffect(() => {
    if (data.query.keyword.length === 0) {
      return;
    }
    dispatch(GET_CATEGORY(data.query.keyword));
  }, [data.query.keyword]);

  const [isListShow, setIsListShow] = useState(false);

  function onChangeInput(e) {
    e.preventDefault();
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

    console.log(listData.responseData);
    setIsListShow(false);
  }
  return (
    <Container>
      <MobileHeader />
      <MainWrapper>
        <Banner>하고 싶은 요가를 검색해보세요.</Banner>
        <SearchInput
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
          {listData.responseData.map((data) => {
            const { id, name, yogaSorts, phoneNum, commonAddress, imageUrl } =
              data;
            return (
              <DataList
                key={id}
                title={name}
                phoneNum={phoneNum}
                imageUrl={imageUrl}
                imageAlt={name}
                hashTags={yogaSorts}
                address={commonAddress}
              />
            );
          })}
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
`;

const Banner = styled.div`
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
`;

const Container = styled.div`
  background: white;
`;

const DataListWrapper = styled.div``;

export default AcademyListPage;
