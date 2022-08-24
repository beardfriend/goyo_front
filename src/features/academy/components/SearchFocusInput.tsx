import * as React from 'react';
import styled from '@emotion/styled/macro';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import mq from '@Libs/theme/mediaQuery';

interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
  isListShow: boolean;
  value: string;
  onKeyup: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onClick: (e) => void;
  searchClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function SearchFocusInput({
  placeholder,
  isListShow,
  onChange,
  onClick,
  onKeyup,
  searchClick,
  value
}: ISearchInput) {
  return (
    <SearchInputWrapper>
      <Input
        autoFocus={true}
        value={value}
        onKeyUp={onKeyup}
        placeholder={placeholder}
        onChange={onChange}
        isListShow={isListShow}
      />
      <BackIconWrapper onClick={onClick}>
        <BackIcon />
      </BackIconWrapper>
      <SearchButton onClick={searchClick}>
        <SearchIcon />
      </SearchButton>
    </SearchInputWrapper>
  );
}

export default SearchFocusInput;

export const SearchInputWrapper = styled.div`
  position: relative;
  margin-top: 0.1rem;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translate(0, -50%);
  width: 3rem;
  height: 5rem;
`;

export const BackIconWrapper = styled.button`
  position: absolute;
  top: 50%;
  left: 2.3rem;
  transform: translate(0, -50%);
`;

export const BackIcon = styled(MdOutlineKeyboardBackspace)`
  width: 2.5rem;
  height: 2rem;
`;

const SearchIcon = styled(BiSearchAlt2)`
  ${mq[0]} {
    width: 2.5rem;
    height: 2.5rem;
  }
  width: 3rem;
  height: 3rem;
`;

const Input = styled.input<{ isListShow }>`
  height: 5rem;
  font-size: 1.5rem;
  padding-left: 6rem;

  outline: none;
  width: 100%;
  border: 1px solid #003d8d;

  border-bottom: ${({ isListShow }) => isListShow && 'none'};

  &::placeholder {
    color: #b9b9b9;
  }

  &:focus {
    border: 2px solid #003d8d !important;
    background: #f4f4f4;
  }

  &:hover {
    background: #f4f4f4;
  }
`;
