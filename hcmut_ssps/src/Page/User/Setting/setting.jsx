import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';  // Import axios for making API calls
import './setting.css'; 
import Sidebar from "../../../components/Sidebar"; 

const Setting = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    student_id: '', 
  });

  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUserInfo({
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        student_id: storedUser.student_id || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.password || !userInfo.phone) {
      setErrorMessage('Số điện thoại và mật khẩu là bắt buộc.');
      return; 
    }

    setErrorMessage(''); 

    try {
      const response = await axios.put(
        `http://localhost:3001/student/update-user/${userInfo.student_id}`,
        {
          phone: userInfo.phone,
          password: userInfo.password, 
        }
      );
      if (response.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify({ ...userInfo }));
        alert('Cài đặt đã được cập nhật!');
      } else {
        alert('Cập nhật thất bại! Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="setting-container">
      <Helmet>
        <title>Cài đặt tài khoản - Dịch vụ in ấn Bách Khoa</title>
      </Helmet>
      <Sidebar />
      <div className="setting-content" style={{ marginLeft: '20px', width: '70%'}}> 
        <h1 className="setting-title" style={{ textAlign: 'center' }}>Cài đặt tài khoản</h1>

        {errorMessage && <div className="error-message" style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="setting-form">
          <div className="setting-input-group">
            <label htmlFor="student_id">Mã sinh viên</label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={userInfo.student_id}
              readOnly  // This prevents editing
            />
          </div>

          <div className="setting-input-group">
            <label htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              name="name"
              value={userInfo.name}
              readOnly  // Keep the name field read-only
            />
          </div>

          <div className="setting-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              readOnly  // Keep the email field read-only
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
