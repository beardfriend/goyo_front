import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IAcademySlice } from '../slices/AcademyListPageState';
import React from 'react';
import mq from '@Libs/theme/mediaQuery';
import { useSelector } from 'react-redux';
import { commonState } from '@Features/common/slices/CommonSlice';

interface ISearchDataList {
  datas: IAcademySlice['category']['responseData'];
  isShow: boolean;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function SearchDataList({ datas, isShow, onClick }: ISearchDataList) {
  const commonData = useSelector(commonState);
  return (
    <SearchDataListContainer isShow={isShow}>
      <ItemWrapper isMobile={commonData.isMobile}>
        {datas.map((data) => {
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

const ItemWrapper = styled.div<{ isMobile: boolean }>`
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? '37rem' : '48rem')};
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
  ${mq[0]} {
    width: 1.5rem;
    height: 1.5rem;
  }
  margin-left: 2.4rem;
  width: 3rem;
  height: 3rem;
`;

const Text = styled.p`
  ${mq[0]} {
    font-size: 1.5rem;
    margin-left: 1.5rem;
  }
  margin-left: 2.5rem;
  font-size: 2.5rem;
`;

SearchDataList.defaultProps = {
  data: [
    { id: 1, text: '하타요가' },
    { id: 2, text: '하타' }
  ]
};
