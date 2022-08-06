import * as React from 'react';
import styled from '@emotion/styled';

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
`;

const Logo = styled.a`
  position: relative;
  left: 5.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
`;

export default MobileHeader;
