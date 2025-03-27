import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/home'; // Import the Home component
import Start from "../pages/Start"; // Import the Start component
import UserLogin from "../pages/UserLogin"; // Import the UserLogin component
import UserSignup from "../pages/UserSignup"; // Import the UserSignup component
import CaptainLogin from "../pages/CaptainLogin"; // Import the CaptainLogin component
import CaptainSignup from "../pages/captainSignup";// Import the CaptainSignup component
import { UserDataContext } from "../src/context/UserContext";
import UserProtectWrapper from "../pages/UserProtectWrapper";
import CaptainHome from "../pages/CaptainHome";
import { CaptainProvider } from "../src/context/CaptainContext";
import CaptainProtectWrapper from "../pages/CaptainProtectedWrapper";

const App = () => {
 
  const ans = useContext(UserDataContext); // Use the UserDataContext
  return (
    <UserDataContext.Provider value={ans}> {/* Ensure UserDataContext is provided */}
      <CaptainProvider> {/* Wrap with CaptainProvider */}
        <div>
          <Routes>
            <Route path="/" element={<Start />} /> {/* Use the Start component */}
            <Route path="/UserLogin" element={<UserLogin />} /> {/* Use the UserLogin component */}
            <Route path="/UserSignup" element={<UserSignup />} /> {/* Use the UserSignup component */}
            <Route path="/captainLogin" element={<CaptainLogin />} /> {/* Use the CaptainLogin component */}
            <Route path="/captainSignup" element={<CaptainSignup />} /> {/* Use the CaptainSignup component */}
            <Route path="/Home" element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            } /> {/* Use the Home component */}
            <Route path="/captain-home" element={
              <CaptainProtectWrapper>
                <CaptainHome/>
              </CaptainProtectWrapper>}/>
          </Routes>
        </div>
      </CaptainProvider>
    </UserDataContext.Provider>
  );
};

export default App;