import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './assets/styles/index.sass';
import Landing from './pages/landing';
import Live from './pages/live';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="go-live" element={<Live />} />
      </Routes>
    </BrowserRouter>
  );
}
