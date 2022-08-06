import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AcademyListPage from '@Features/academy/pages/AcademyListPage';
import { Routes, Route } from 'react-router-dom';

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

export const App = () => (
  <Container>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<AcademyListPage />} />
      </Routes>
    </ChakraProvider>
  </Container>
);

const Container = styled.div`
  max-width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  background: #ffffff;
`;
