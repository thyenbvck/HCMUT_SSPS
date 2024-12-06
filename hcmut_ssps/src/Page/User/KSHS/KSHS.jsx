// src/Page/User/KSHS/KSHS.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import './KSHS.css'; 
import Sidebar from "../../../components/Sidebar";

const KSHS = () => {
  return (
    <div className="kshs-container">
      <Helmet>
        <title>KSHS - Trang hỗ trợ học sinh</title>
      </Helmet>
      <div className="kshs-content">
        <Sidebar />
        <div className="kshs-main-content">
          <h1 className="kshs-title">Trang hỗ trợ sinh viên (KSHS)</h1>
          <p>
            Đây là trang dành cho sinh viên với các thông tin hỗ trợ, tài liệu học tập, và các dịch vụ liên quan.
          </p>
          <br></br>

          <section className="kshs-section">
            <h2>Tài liệu học tập</h2>
            <p>Chúng tôi cung cấp các tài liệu học tập miễn phí cho sinh viên. Dưới đây là một số tài liệu bạn có thể tham khảo:</p>
            <ul>
              <li><a href="http://example.com/tailieu1.pdf" target="_blank" rel="noopener noreferrer">Tài liệu Lý thuyết Hóa học đại cương</a></li>
              <li><a href="http://example.com/tailieu2.pdf" target="_blank" rel="noopener noreferrer">Bài tập Giải tích 2</a></li>
              <li><a href="http://example.com/tailieu3.pdf" target="_blank" rel="noopener noreferrer">Giới thiệu về Lịch sử Đảng</a></li>
            </ul>
          </section>

          <section className="kshs-section">
            <h2>Dịch vụ hỗ trợ sinh viên</h2>
            <p>Chúng tôi cung cấp các dịch vụ hỗ trợ để giúp sinh viên học tập và phát triển tốt hơn:</p>
            <ul>
              <li><strong>Tư vấn học tập:</strong> Hỗ trợ sinh viên giải đáp thắc mắc về môn học, giúp sinh viên cải thiện kết quả học tập.</li>
              <li><strong>Hỗ trợ tâm lý:</strong> Cung cấp các dịch vụ tư vấn tâm lý miễn phí cho sinh viên gặp khó khăn trong học tập và cuộc sống.</li>
              <li><strong>Cộng đồng sinh viên:</strong> Nơi sinh viên có thể giao lưu, trao đổi kiến thức, chia sẻ kinh nghiệm học tập.</li>
            </ul>
          </section>

          <section className="kshs-section">
            <h2>Liên kết hữu ích</h2>
            <p>Dưới đây là một số liên kết hữu ích dành cho sinh viên:</p>
            <ul>
              <li><a href="https://www.edu.vn" target="_blank" rel="noopener noreferrer">Website giáo dục Việt Nam</a></li>
              <li><a href="https://www.studyabroad.com" target="_blank" rel="noopener noreferrer">Thông tin du học</a></li>
              <li><a href="https://www.math.com" target="_blank" rel="noopener noreferrer">Website tài liệu miễn phí</a></li>
            </ul>
          </section>

          <section className="kshs-section">
            <h2>Thông báo mới nhất</h2>
            <ul>
              <li>Chương trình học bổng 2024 đang mở đơn đăng ký, hãy nộp đơn trước ngày 30 tháng 12.</li>
              <li>Cuộc thi sinh viên IT sẽ được tổ chức vào tháng 2, đăng ký tham gia tại đây.</li>
              <li>Hội thảo về phương pháp học hiệu quả sẽ được tổ chức vào ngày 15 tháng 12.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default KSHS;
