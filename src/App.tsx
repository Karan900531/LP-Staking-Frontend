import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import IpForm from "./components/IpForms";
import Swap from "./components/Swap";
const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="layout-content">
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/tstaking" element={<Home />} />
          <Route path="/lpstaking" element={<IpForm />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
