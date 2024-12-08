import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import logo from '../assest/logo.png';
import "./Sidebar.css";

const AdminSidebar = () => {
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
        <h2>ADMIN</h2>
      </div>
      <nav className="menu">
        <Link 
          to="/admin/admin-info" 
          className={`menu-item ${location.pathname === '/admin/admin-info' ? 'active' : ''}`}
        >
          <i className="icon">ℹ️</i> Thông Tin Admin
        </Link>
        <Link 
          to="/admin/account-management" 
          className={`menu-item ${location.pathname === '/admin/account-management' ? 'active' : ''}`}
        >
          <i className="icon">👤</i> Quản Lý Tài Khoản
        </Link>
        <Link 
          to="/admin/printer-management" 
          className={`menu-item ${location.pathname === '/admin/printer-management' ? 'active' : ''}`}
        >
          <i className="icon">🖨️</i> Quản Lý Máy In
        </Link>
        <Link 
          to="/admin/configuration-management" 
          className={`menu-item ${location.pathname === '/admin/configuration-management' ? 'active' : ''}`}
        >
          <i className="icon">🖨️</i> Quản Lý Cấu Hình
        </Link>
        <div className="divider" />
        <h4>Reports</h4>
        <Link 
          to="/admin/reports" 
          className={`menu-item ${location.pathname === '/admin/reports' ? 'active' : ''}`}
        >
          <i className="icon">📊</i> Báo Cáo
        </Link>
        <Link 
          to="/admin/support" 
          className={`menu-item ${location.pathname === '/admin/support' ? 'active' : ''}`}
        >
          <i className="icon">❓</i> Hỗ Trợ
        </Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <i className="icon">🔓</i> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
