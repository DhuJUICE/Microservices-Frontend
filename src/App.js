import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart-context";
import { Elements } from "@stripe/react-stripe-js"; // Importing Stripe Elements
import ScrollToTop from "./components/scrollToTop";

// Importing your components
import Home from "./components/home";

import Registration from "./components/registration";
import Pairings from "./components/pairings";
import "./App.css";
import Header from './components/sectionComponents/header'; // Import Header component
import Footer from './components/sectionComponents/footer'; // Import Footer component

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop /> {/* Ensures scrolling to top on route change */}
        <div className="App">
          <div className="header">
            <Header />
          </div>

          <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/pairings" element={<Pairings />} />
              </Routes>
          </div>

          {/*
            <div className="footer">
              <Footer />
            </div>
          */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
