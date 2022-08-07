import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IAcademySlice } from '../slices/AcademyListPageState';
import React from 'react';

interface ISearchDataList {
  datas: IAcademySlice['category']['responseData'];
  isShow: boolean;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function SearchDataList({ datas, isShow, onClick }: ISearchDataList) {
  return (
    <SearchDataListContainer isShow={isShow}>
      <ItemWrapper>
        {datas?.map((data) => {
          return (
            <ItemBox key={data.id} onClick={onClick}>
              <SearchIcon />
              <Text>{data.name}</Text>
            </ItemBox>
          );
        })}
      </ItemWrapper>
    </SearchDataListContainer>
  );
}

export default SearchDataList;

const SearchDataListContainer = styled.div<{ isShow }>`
  ${({ isShow }) => {
    if (isShow) {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 37rem;
  border: 2px solid #003d8d;
  border-top: none;
`;

const ItemBox = styled.button`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  width: 100%;
  &:hover {
    background: #f4f4f4;
  }
`;

const SearchIcon = styled(BiSearchAlt2)`
  margin-left: 2.4rem;
  width: 3rem;
  height: 3rem;
`;

const Text = styled.p`
  margin-left: 2.5rem;
  font-size: 2.5rem;
`;

SearchDataList.defaultProps = {
  data: [
    { id: 1, text: '하타요가' },
    { id: 2, text: '하타' }
  ]
};
