import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/layout/index.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
