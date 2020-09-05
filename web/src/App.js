import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from './contexts/provider';
import Routes from './routes'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
