import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AcademyListPage from '@Features/academy/pages/AcademySearchPage';
import { setIsMobile } from '@Features/common/slices/CommonSlice';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store';

const theme = {
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Noto Sans KR',
        fontSize: '10px',
        boxSizing: 'border-box',
        background: '#E5E5E5'
      }
    }
  }
};

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (window.innerWidth < 500) {
      dispatch(setIsMobile(true));
    }
  }, []);
  return (
    <Container>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<AcademyListPage />} />
        </Routes>
      </ChakraProvider>
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  background: #ffffff;
`;
