import { useAppDispatch } from '@Apps/store';
import styled from '@emotion/styled/macro';
import { EffectCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DataList, { ListContainer } from '../components/DataList';
import ListBanner from '../components/ListBanner';
import {
  GET_LIST,
  listState,
  setSearchListKeyword,
  setSearchListResponse
} from '../slices/AcademyListPageSlice';

function AcademyListPage() {
  const [count, setCount] = useState(1);
  const firstRenderRef = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const listData = useSelector(listState);
  const dispatch = useAppDispatch();
  const text = decodeURI(location.pathname).substring(1);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      dispatch(GET_LIST({ keyword: text, pageNum: count }));
      return;
    }
  }, []);

  useEffect(() => {
    if (count > 1) {
      dispatch(GET_LIST({ keyword: text, pageNum: count }));
    }
  }, [count]);

  function Back() {
    navigate('/');
    dispatch(setSearchListResponse([]));
    dispatch(setSearchListKeyword(''));
  }
  function More() {
    setCount(count + 1);
  }

  return (
    <DataListWrapper>
      <ListBanner
        onClick={Back}
        title={text}
        total={listData.pagination.rowCount}
      />
      {listData.responseData.length === 0 ? (
        <NoResult>검색 결과가 없습니다.</NoResult>
      ) : (
        <DataList data={listData.responseData} />
      )}

      {listData.pagination.pageCount > listData.pagination.page && (
        <MoreButton onClick={More}>더보기</MoreButton>
      )}
    </DataListWrapper>
  );
}

const DataListWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 20rem;
  padding: 0 2rem;
  width: 100%;
  ${ListContainer} {
    margin-top: 2rem;
  }
`;

const NoResult = styled.div`
  margin-top: 20rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;

const MoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  width: 10rem;
  height: 3rem;
  border-radius: 2rem;
  background: #003d8d;
  color: white;
`;
export default AcademyListPage;
