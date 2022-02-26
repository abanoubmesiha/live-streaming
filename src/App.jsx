import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './assets/styles/index.sass';
import Landing from './pages/landing';
import GoLive from './pages/go-live';
import WatchLive from './pages/watch-live';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="go-live" element={<GoLive />} />
        <Route path="watch-live" element={<WatchLive />} />
      </Routes>
    </BrowserRouter>
  );
}
