import React from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";  // Thêm useLocation
import logo from '../assest/logo.png';
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();  
  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>HCMUT PRINT</h2>
      </div>
      <nav className="menu">
        <Link 
          to="/student/account-info" 
          className={`menu-item ${location.pathname === '/student/account-info' ? 'active' : ''}`}
        >
          <i className="icon">📄</i> Thông Tin Tài Khoản
        </Link>
        <Link 
          to="/student/print-services" 
          className={`menu-item ${location.pathname === '/student/print-services' ? 'active' : ''}`}
        >
          <i className="icon">🚗</i> Dịch Vụ In Ấn
        </Link>
        <Link 
          to="/student/buy-pages" 
          className={`menu-item ${location.pathname === '/student/buy-pages' ? 'active' : ''}`}
        >
          <i className="icon">🛒</i> Mua Thêm Trang In
        </Link>
        <Link 
          to="/student/notifications" 
          className={`menu-item ${location.pathname === '/student/notifications' ? 'active' : ''}`}
        >
          <i className="icon">🔔</i> Thông Báo
        </Link>
        <Link 
          to="/student/settings" 
          className={`menu-item ${location.pathname === '/student/settings' ? 'active' : ''}`}
        >
          <i className="icon">⚙️</i> Cài Đặt
        </Link>
        <div className="divider" />
        <h4>Report</h4>
        <Link 
          to="/student/kshs" 
          className={`menu-item ${location.pathname === '/student/kshs' ? 'active' : ''}`}
        >
          <i className="icon">📊</i> Lịch sử giao dịch
        </Link>
        <Link 
          to="/student/support" 
          className={`menu-item ${location.pathname === '/student/support' ? 'active' : ''}`}
        >
          <i className="icon">❓</i> Hỗ Trợ
        </Link>
        <Link 
          to="/student/History" 
          className={`menu-item ${location.pathname === '/student/History' ? 'active' : ''}`}
        >
          <i className="icon">📋</i> Báo Cáo Tiêu Dùng
        </Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <i className="icon">🔓</i> Logout
      </button>
    </div>
  );
};

export default Sidebar;
