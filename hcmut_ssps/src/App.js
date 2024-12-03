import React, { useState } from "react";
import Login from "./Page/Login/login";
import PrintPage from "./Page/PrintPage/printPage"
import PrintSelection from "./Page/PrintSelection/PrintSelection.jsx"
import Info from "./Page/Info/info.jsx"


import { BrowserRouter as Router, Route, Routes, useLocation  } from "react-router-dom";
// import accountInfo from "./Page/Info/Info";
// import onlinePayment from "./Page/onlinePayment";
// import buyPages from "./Page/buyPages";
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  return (
    <div className="app-container">  
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/print-services" element={<PrintPage />} />
          {/* Thêm các Route khác nếu cần */}
          <Route path="/print-slection" element={<PrintSelection/>}  />
          <Route path="/account-info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
