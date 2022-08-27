import { useAppDispatch } from '@Apps/store';
import { Box } from '@chakra-ui/react';
import { commonState } from '@Features/common/slices/CommonSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchDataList from '../components/SearchDataList';
import SearchFocusInput from '../components/SearchFocusInput';
import SearchInput from '../components/SearchInput';
import {
  categoryState,
  setSearchListResponse,
  GET_CATEGORY,
  setSearchKeyword,
  PUT_SCORE
} from '../slices/AcademyListPageSlice';
import {
  academySearchState,
  setInputFocus
} from '../slices/AcadmeySearchPageSlice';

function SearchContainer() {
  const dispatch = useAppDispatch();
  const data = useSelector(categoryState);
  const searchState = useSelector(academySearchState);
  const navigate = useNavigate();
  const commonData = useSelector(commonState);

  function dataFetch() {
    dispatch(setSearchListResponse([]));
    if (data.query.keyword.length === 0) {
      return;
    }
    dispatch(GET_CATEGORY(data.query.keyword));
  }

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
    dispatch(
      PUT_SCORE({
        keyword: data.query.keyword,
        member: data.query.keyword
      })
    );
    dispatch(setSearchKeyword(''));
    setIsListShow(false);
  }

  function RecommendKeyWordClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const text = e.currentTarget.textContent;
    navigate(`/${text}`);
    dispatch(setSearchKeyword(''));
    dispatch(
      PUT_SCORE({ keyword: data.query.keyword, member: text as string })
    );
    setIsListShow(false);
  }

  function onChangeFocus(e: React.FormEvent<HTMLInputElement>) {
    if (commonData.isMobile) {
      dispatch(setInputFocus(true));
    }
  }
  function onClickBackSpace(e: React.FormEvent<HTMLInputElement>) {
    dispatch(setInputFocus(false));
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

  return (
    <Box width='100%'>
      {commonData.isMobile && searchState.isFocus ? (
        <SearchFocusInput
          value={data.query.keyword}
          onKeyup={dataFetch}
          placeholder='검색어를 입력해주세요'
          onClick={onClickBackSpace}
          searchClick={searchClick}
          isListShow={isListShow}
          onChange={onChangeInput}
        />
      ) : (
        <SearchInput
          onClick={handleClick}
          onKeyUp={dataFetch}
          onFocus={onChangeFocus}
          value={data.query.keyword}
          placeholder='검색어를 입력해주세요'
          isListShow={isListShow}
          onChange={onChangeInput}
        />
      )}

      <SearchDataList
        isShow={isListShow}
        datas={data.responseData}
        onClick={RecommendKeyWordClick}
      />
    </Box>
  );
}

export default SearchContainer;
