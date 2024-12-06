// src/Page/User/KSHS/KSHS.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import './noti.css'; 
import Sidebar from "../../../components/Sidebar";

const Noti = () => {
  return (
    <div className="kshs-container">
      <Helmet>
        <title>KSHS - Trang hỗ trợ học sinh</title>
      </Helmet>
      <div className="kshs-content">
        <Sidebar />
        <div className="kshs-main-content">
          <h1 className="kshs-title">Trang thông báo</h1>

          <section className="kshs-section">
          <h2>Thông báo về dịch vụ in ấn</h2>
          <ul>
            <li>
              <strong>Giảm giá 10% cho sinh viên:</strong> Sinh viên Bách Khoa được giảm giá 10% cho tất cả các dịch vụ in ấn trong tháng này. Áp dụng khi sử dụng mã giảm giá: <em>BK10</em>.
            </li>
            <li>
              <strong>Thời gian hoạt động:</strong> Dịch vụ in ấn sẽ mở cửa từ 8:00 AM đến 6:00 PM từ thứ Hai đến thứ Sáu. 
            </li>
            <li>
              <strong>Cập nhật dịch vụ:</strong> Chúng tôi vừa cập nhật dịch vụ in màu chất lượng cao. Đến ngay để trải nghiệm!
            </li>
          </ul>

          </section>

          <section className="kshs-section">
          <h2>Thông báo về sự kiện</h2>
          <ul>
            <li>
              <strong>Hội thảo về in ấn:</strong> Tham gia hội thảo vào ngày 15 tháng 12 để tìm hiểu về kỹ thuật in ấn hiện đại và các dịch vụ mới.
            </li>
            <li>
              <strong>Cuộc thi thiết kế logo:</strong> Gửi bài dự thi thiết kế logo cho dịch vụ in ấn của chúng tôi và nhận giải thưởng hấp dẫn! Deadline: 20 tháng 12.
            </li>
          </ul>
          </section>

          <section className="kshs-section">
          <h2>Thông báo về chương trình học bổng</h2>
          <ul>
            <li>
              <strong>Học bổng dịch vụ in ấn:</strong> Chúng tôi đang triển khai chương trình học bổng cho sinh viên có thành tích học tập xuất sắc. Đăng ký tham gia chương trình trước ngày 25 tháng 12.
            </li>
          </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Noti;
