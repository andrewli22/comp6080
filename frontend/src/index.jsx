import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import StoreProvider from './utils/store';

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);
