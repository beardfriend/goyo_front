import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AcademyListPage from '@Features/academy/pages/AcademyListPage';
import AcademySearchPage from '@Features/academy/pages/AcademySearchPage';
import AdminLogin from '@Features/admin/pages/AdminLogin';
import Regist from '@Features/admin/pages/Regist';
import NotFound from '@Features/common/pages/NotFound';
import { commonState, setIsMobile } from '@Features/common/slices/CommonSlice';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store';

export const App = () => {
  const data = useSelector(commonState);
  const fullMode = data.fullMode;
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          background: '#E5E5E5'
        },
        html: {
          font: 'Noto Sans KR',
          fontSize: data.fontSize,
          boxSizing: 'border-box'
        }
      }
    }
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (window.innerWidth < 500) {
      dispatch(setIsMobile(true));
    }
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Container fullMode={fullMode}>
          <Routes>
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin' element={<Regist />} />
            <Route path='/' element={<AcademySearchPage />} />
            <Route path='/:keyword' element={<AcademyListPage />} />
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Container>
      </CookiesProvider>
    </ChakraProvider>
  );
};

const Container = styled.div<{ fullMode }>`
  font-family: 'Noto Sans KR';
  font-size: 10px;
  max-width: ${({ fullMode }) => (fullMode ? '100%' : '768px')};
  min-height: 100vh;
  margin: 0 auto;
  background: #ffffff;
`;
