import styled from '@emotion/styled';
import * as React from 'react';

interface CategoryList {
  children: React.ReactNode;
}

function CategoryList({ children }: CategoryList) {
  return <Container>{children}</Container>;
}

export default CategoryList;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 20rem;
  overflow-x: scroll;
  overflow-y: hidden;
`;
