import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ComicDetail from './pages/ComicDetail';
import CheckoutPage from './pages/CheckoutPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/comic-detail/:id" element={<ComicDetail/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
