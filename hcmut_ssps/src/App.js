import React, { useState } from "react";
import Login from "./Page/Login/login";
import PrintPage from "./Page/PrintPage/printPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      {isLoggedIn ? <PrintPage /> : <Login onLogin={handleLogin} />}
    </div>
  );
}
export default App;
