import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
import config from '@rtds-config';
import { initSmoothScroll } from '../../../tooling/playground/initSmoothScroll';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void initSmoothScroll(config);
