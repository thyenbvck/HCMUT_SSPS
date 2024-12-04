import React from "react";
import { Link, useLocation } from "react-router-dom";  // Thêm useLocation
import logo from '../assest/logo.png';
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();  // Lấy đường dẫn hiện tại của URL

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>HCMUT PRINT</h2>
      </div>
      <nav className="menu">
        <Link 
          to="/account-info" 
          className={`menu-item ${location.pathname === '/account-info' ? 'active' : ''}`}
        >
          <i className="icon">📄</i> Thông Tin Tài Khoản
        </Link>
        <Link 
          to="/print-services" 
          className={`menu-item ${location.pathname === '/print-services' ? 'active' : ''}`}
        >
          <i className="icon">🚗</i> Dịch Vụ In Ấn
        </Link>
        <Link 
          to="/buy-pages" 
          className={`menu-item ${location.pathname === '/buy-pages' ? 'active' : ''}`}
        >
          <i className="icon">🛒</i> Mua Thêm Trang In
        </Link>
        <Link 
          to="/notifications" 
          className={`menu-item ${location.pathname === '/notifications' ? 'active' : ''}`}
        >
          <i className="icon">🔔</i> Thông Báo
        </Link>
        <Link 
          to="/settings" 
          className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <i className="icon">⚙️</i> Cài Đặt
        </Link>
        <div className="divider" />
        <h4>Report</h4>
        <Link 
          to="/kshs" 
          className={`menu-item ${location.pathname === '/kshs' ? 'active' : ''}`}
        >
          <i className="icon">📊</i> KSHS
        </Link>
        <Link 
          to="/support" 
          className={`menu-item ${location.pathname === '/support' ? 'active' : ''}`}
        >
          <i className="icon">❓</i> Hỗ Trợ
        </Link>
        <Link 
          to="/History" 
          className={`menu-item ${location.pathname === '/History' ? 'active' : ''}`}
        >
          <i className="icon">📋</i> Báo Cáo Tiêu Dùng
        </Link>
      </nav>
      <button className="logout-button">
        <i className="icon">🔓</i> Logout
      </button>
    </div>
  );
};

export default Sidebar;
