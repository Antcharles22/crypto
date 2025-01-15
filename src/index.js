import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Show from './pages/show';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
   <Route index element={<Home />} />
   <Route path="/:id" element={<Show />} />
  </Routes>
</BrowserRouter >
);
  
