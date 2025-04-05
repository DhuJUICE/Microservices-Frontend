import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

// Importing your components
import Home from "./components/home";

function App() {
  return (
      <Router>
        <ScrollToTop /> {/* Ensures scrolling to top on route change */}

        <div className="App">
          <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
