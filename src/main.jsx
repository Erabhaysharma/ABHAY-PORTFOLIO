import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '../public/style/hero.css';
import '../public/style/skill.css';

import App from './App.jsx';
import Admin from './pages/admin.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    
  </StrictMode>
);
