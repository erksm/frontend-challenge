import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ComicDetail from './pages/ComicDetail';
import CheckoutPage from './pages/CheckoutPage';
import './source/styles/variables.scss';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/comic-detail/:id" element={<ComicDetail/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;