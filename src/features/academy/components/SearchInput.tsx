import * as React from 'react';
import styled from '@emotion/styled/macro';
import { BiSearchAlt2 } from 'react-icons/bi';
import { ReactComponent as Yoga } from '@Assets/input/yoga.svg';
import mq from '@Libs/theme/mediaQuery';

interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
  isListShow: boolean;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

function SearchInput({
  placeholder,
  isListShow,
  onChange,
  value
}: ISearchInput) {
  return (
    <SearchInputWrapper>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isListShow={isListShow}
      />
      <LogoIconWrapper>
        <LogoIcon />
      </LogoIconWrapper>
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchInputWrapper>
  );
}

export default SearchInput;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

const LogoIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 2.3rem;
  transform: translate(0, -50%);
`;

const LogoIcon = styled(Yoga)`
  ${mq[0]} {
    width: 2.5rem;
    height: 2rem;
  }
  width: 3rem;
  height: 4rem;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translate(0, -50%);
  width: 3rem;
  height: 5rem;
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
  ${mq[0]} {
    height: 5rem;
    font-size: 1.5rem;
    padding-left: 6rem;
  }
  outline: none;
  padding-left: 8rem;
  width: 100%;
  height: 6rem;
  border: 1px solid #003d8d;
  border-radius: ${(props) => (props.isListShow ? '2rem 2rem 0 0' : '2rem')};

  border-bottom: ${({ isListShow }) => isListShow && 'none'};
  font-size: 2.5rem;
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
