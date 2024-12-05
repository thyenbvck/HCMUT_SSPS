import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './setting.css'; 
import Sidebar from "../../../components/Sidebar"; 

const Setting = () => {
  const [userInfo, setUserInfo] = useState({
    username: 'user123', 
    email: 'user123@bku.edu.vn',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý lưu thông tin người dùng (gửi API, v.v.)
    alert('Cài đặt đã được cập nhật!');
  };

  return (
    <div className="setting-container">
      <Helmet>
        <title>Cài đặt tài khoản - Dịch vụ in ấn Bách Khoa</title>
      </Helmet>
      <Sidebar />
      <div className="setting-content" style={{ marginLeft: '20px', width: '70%'}}> 
      <h1 className="setting-title" style={{ textAlign: 'center' }}>Cài đặt tài khoản</h1>

        
        <form onSubmit={handleSubmit} className="setting-form">
          <div className="setting-input-group">
            <label htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
            />
          </div>

          <div className="setting-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>

          <div className="setting-input-group">
            <label htmlFor="password">Mật khẩu mới</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>

          <div className="setting-input-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="setting-submit-btn">Lưu cài đặt</button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
