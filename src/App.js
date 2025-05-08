import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/Header";

// Importing your components
import Home from "./components/home";
import SupervisorPage from "./components/supervisor-page";
import TellerPage from "./components/teller-page";
import AtmPage from "./components/atm-page";

function App() {
  return (
    <div>
      <Header />

      <Router>
        <ScrollToTop /> {/* Ensures scrolling to top on route change */}

        <div className="App">
          <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/supervisor" element={<SupervisorPage/>}/>
                <Route path="/teller" element={<TellerPage/>}/>
                <Route path="/atm" element={<AtmPage/>}/>
              </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
