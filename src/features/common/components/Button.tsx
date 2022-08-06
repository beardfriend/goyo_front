import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as React from 'react';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactText;
}

function Button({ isActive, children, ...props }: IButton) {
  return (
    <Wrap {...props} isActive={isActive}>
      {children}
    </Wrap>
  );
}

export default Button;

const Wrap = styled.button<IButton>`
  width: fit-content;
  display: inline-block;
  padding: 0.4rem 0.4rem;
  height: 3rem;
  border-radius: 3rem;
  font-size: 1.4rem;
  ${({ isActive }) => {
    if (isActive) {
      return css`
        background-color: #003d8d;
        color: white;
      `;
    }
    return css`
      background-color: white;
      color: #003d8d;
      border: 1px solid #003d8d;
    `;
  }}
`;
