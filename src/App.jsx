import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingButtons from './components/FloatingButtons';
import CartSidebar from './components/CartSidebar';

import Home from './pages/Home';
import Store from './pages/Store';
import { About } from './pages/About';       // About page only
import Contact from './pages/Contact';        // Real API-connected Contact
import { Login, Signup, Profile } from './pages/Auth';
import Checkout from './pages/Checkout';
import OrderTrack from './pages/OrderTrack';
import PolicyPage from './pages/PolicyPage';
import ProductDetails from './pages/ProductDetails';

const AppLayout = () => {
  const location = useLocation();
  const hideChrome = ['/login', '/signup'].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      {!hideChrome && <Navbar />}
      {!hideChrome && <CartSidebar />}
      <main key={location.pathname}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/store"           element={<Store />} />
          <Route path="/store/:category" element={<Store />} />
          <Route path="/product/:id"     element={<ProductDetails />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/signup"          element={<Signup />} />
          <Route path="/profile"         element={<Profile />} />
          <Route path="/checkout"        element={<Checkout />} />
          <Route path="/track-order"     element={<OrderTrack />} />
          <Route path="/policy/:type"    element={<PolicyPage />} />
        </Routes>
      </main>
      {!hideChrome && <FloatingButtons />}
      {!hideChrome && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
