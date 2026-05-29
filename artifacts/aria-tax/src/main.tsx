import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import CompareEmbed from './CompareEmbed.tsx';
import './i18n';
import './index.css';

const pathname = window.location.pathname;
const isCompareEmbed =
  pathname === '/compare-embed' ||
  pathname.endsWith('/compare-embed') ||
  pathname.endsWith('/compare-embed/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCompareEmbed ? <CompareEmbed /> : <App />}
  </StrictMode>
);
