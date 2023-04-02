import React from 'react';
import { render } from '@testing-library/react';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import StoreProvider from '../utils/store';

const AllTheProviders = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
