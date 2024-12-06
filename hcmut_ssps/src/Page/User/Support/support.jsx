import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './support.css';  
import Sidebar from "../../../components/Sidebar";

const SupportUser = () => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      // Gửi thông tin hỗ trợ tới API hoặc backend tại đây
      setIsSubmitted(true);
      // Thực hiện các thao tác như gửi API hoặc lưu trữ
    }
  };

  return (
    <div className="support-container">
      <Helmet>
        <title>Hỗ trợ quản trị</title>
      </Helmet>
      <Sidebar/>
      <div className="support-content">
        <h1 className="support-title">Trang hỗ trợ quản trị</h1>
        <p>Chào mừng bạn đến với trang hỗ trợ. Hãy gửi câu hỏi hoặc phản hồi của bạn tại đây:</p>

        <div className="support-form">
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Nhập câu hỏi hoặc yêu cầu hỗ trợ của bạn..."
            rows="5"
            className="support-textarea"
          />
          <button onClick={handleSubmit} className="support-submit-button">
            Gửi yêu cầu
          </button>
        </div>

        {isSubmitted && <p className="success-message">Yêu cầu hỗ trợ của bạn đã được gửi thành công!</p>}

        {/* Ví dụ về các câu hỏi thường gặp */}
        <div className="faq-section">
          <h2>Câu hỏi thường gặp</h2>
          <ul>
            <li><strong>Q1:</strong> Làm thế nào để thêm người dùng mới?</li>
            <li>Trả lời: Bạn có thể vào trang Quản lý tài khoản để thêm người dùng mới.</li>
            <li><strong>Q2:</strong> Làm sao để in báo cáo?</li>
            <li>Trả lời: Bạn có thể truy cập trang Báo cáo và chọn báo cáo bạn muốn in.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportUser;
