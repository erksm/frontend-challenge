import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ComicDetail from './pages/ComicDetail';
import CheckoutPage from './pages/CheckoutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/comic-detail/:id" element={<ComicDetail/>} />
          <Route exact path="/checkout" element={<CheckoutPage/>} />
          <Route exact path="/success" element={<SuccessPage/>} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
