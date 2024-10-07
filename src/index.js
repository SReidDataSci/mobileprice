import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PhonePricePredictor from './PhonePricePredictor';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    background: {
      default: '#f5f5f5', // light grey background
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PhonePricePredictor />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);