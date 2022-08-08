import * as React from 'react';
import styled from '@emotion/styled/macro';
import mq from '@Libs/theme/mediaQuery';
import { BackIcon } from './SearchFocusInput';

interface IListBanner {
  title: string;
  total: number;
  onClick: () => void;
}

function ListBanner({ title, total, onClick }: IListBanner) {
  return (
    <ListBannerContainer>
      <IconWrapper onClick={onClick}>
        <BackIcon />
      </IconWrapper>
      <Title>
        "{title}" 검색결과입니다. <span>({total}개)</span>
      </Title>
    </ListBannerContainer>
  );
}

export default ListBanner;

const ListBannerContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  width: 100%;
  height: 3rem;
  text-align: center;
`;

const IconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  ${mq[0]} {
    font-size: 1.5rem;
  }
  font-weight: 700;
  font-size: 2.5rem;
  margin: auto auto;

  span {
    font-size: 1.4rem;
  }
`;
