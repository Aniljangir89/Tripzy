import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/home';
import Start from "../pages/Start";
import UserLogin from "../pages/UserLogin";
import UserSignup from "../pages/UserSignup";
import CaptainLogin from "../pages/CaptainLogin";
import CaptainSignup from "../pages/CaptainSignup"; // Fix casing
import UserProtectWrapper from "../pages/UserProtectWrapper";
import CaptainHome from "../pages/CaptainHome";
import { CaptainProvider } from "../src/context/CaptainContext";
import CaptainProtectWrapper from "../pages/CaptainProtectWrapper";
import Riding from "../pages/Riding";
import CaptainRiding from "../pages/CaptainRiding";
import 'leaflet/dist/leaflet.css';
const App = () => {
  return (
    <CaptainProvider> {/* Wrap with CaptainProvider */}
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/captainSignup" element={<CaptainSignup />} />
          <Route path="/Riding" element={<Riding />} />
          <Route path="/captains-riding" element={<CaptainRiding />} />
          <Route path="/Home" element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
          <Route path="/captain-home" element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          } />
        </Routes>
      </div>
    </CaptainProvider>
  );
};

export default App;
