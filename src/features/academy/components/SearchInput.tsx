import * as React from 'react';
import styled from '@emotion/styled/macro';
import { ReactComponent as Yoga } from '@Assets/input/yoga.svg';

interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {}

function SearchInput({ placeholder }: ISearchInput) {
  return (
    <InputWrapper>
      <Input placeholder={placeholder} />
      <InputLogoWrapper>
        <Yoga />
      </InputLogoWrapper>
    </InputWrapper>
  );
}

export default SearchInput;

export const InputWrapper = styled.div`
  position: relative;
`;

const InputLogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 2.3rem;
  transform: translate(0, -50%);
  width: 3rem;
  height: 4rem;
`;

const Input = styled.input`
  padding-left: 8rem;
  width: 100%;
  height: 6rem;
  border: 1px solid #003d8d;
  border-radius: 2rem;
  font-size: 2.5rem;
  &::placeholder {
    color: #b9b9b9;
  }
`;
