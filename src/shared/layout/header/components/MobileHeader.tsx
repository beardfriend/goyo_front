import * as React from 'react';
import styled from '@emotion/styled';
import mq from '@Libs/theme/mediaQuery';

function MobileHeader() {
  return (
    <Header>
      <Logo>Relax</Logo>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  background: #252933;
  ${mq[0]} {
    height: 5rem;
  }
`;

const Logo = styled.a`
  ${mq[0]} {
    font-size: 1.5rem;
    left: 2rem;
  }
  position: relative;
  left: 5.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
`;

export default MobileHeader;
