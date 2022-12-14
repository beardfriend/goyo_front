import { ColorModeScript } from '@chakra-ui/react';
import { store } from '@Apps/store';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './apps/App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
