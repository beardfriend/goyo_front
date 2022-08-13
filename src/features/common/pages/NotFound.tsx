import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled/macro';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <div
          style={{
            display: 'flex',
            gap: '5rem',
            position: 'relative',
            top: '100px'
          }}
        >
          <Button onClick={() => navigate('/')}>홈화면으로 돌아가기</Button>
          <Button onClick={() => navigate(-1)}>이전 화면으로 돌아가기</Button>
        </div>
      </Main>
    </>
  );
};

export default NotFound;

const Main = styled.main`
  display: flex;
  position: relative;
  gap: 10rem;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7 !important;
    z-index: -1;
    width: 100%;
    height: 100%;

    background-position: center;
    background-size: 150%;
    opacity: 0.6;
  }
  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;

const Button = styled.button`
  position: relative;
  z-index: 1;
  width: 200px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  background: #247674;
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;
