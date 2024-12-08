// src/Page/User/TransactionHistory/TransactionHistory.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import './KSHS.css';
import Sidebar from "../../../components/Sidebar";

const KSHS = () => {
  return (
    <div className="transaction-history-container">
      <Helmet>
        <title>Lịch sử giao dịch</title>
      </Helmet>
      <div className="transaction-history-content">
        <Sidebar />
        <div className="transaction-history-main-content">
          <h1 className="transaction-history-title">Lịch sử giao dịch</h1>
          <p>
            Đây là trang ghi nhận các giao dịch in ấn mà bạn đã thực hiện. Vui lòng kiểm tra chi tiết từng giao dịch bên dưới.
          </p>
          <br></br>

          <section className="transaction-history-section">
            <h2>Danh sách giao dịch</h2>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Mã giao dịch</th>
                  <th>Ngày</th>
                  <th>Số lượng trang</th>
                  <th>Chi phí</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GD001</td>
                  <td>01/12/2024</td>
                  <td>A4: 5</td>
                  <td>5.000 VNĐ</td>
                  <td>Thành công</td>
                </tr>
                <tr>
                  <td>GD002</td>
                  <td>03/12/2024</td>
                  <td>A2: 3</td>
                  <td>3.000 VNĐ</td>
                  <td>Thành công</td>
                </tr>
                <tr>
                  <td>GD003</td>
                  <td>05/12/2024</td>
                  <td>A3: 4, A4: 2</td>
                  <td>6.000 VNĐ</td>
                  <td>Thành công</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="transaction-history-section">
            <h2>Thông tin quan trọng</h2>
            <ul>
              <li>Giao dịch có trạng thái "Thành công" đã được xử lý và in hoàn tất.</li>
              <li>Nếu bạn gặp vấn đề với bất kỳ giao dịch nào, vui lòng liên hệ bộ phận hỗ trợ.</li>
              <li>Các giao dịch được lưu trữ trong vòng 6 tháng kể từ ngày thực hiện.</li>
            </ul>
          </section>

          <section className="transaction-history-section">
            <h2>Hỗ trợ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:
              <br />
              <strong>Email:</strong> support@bachkhoa-printing.com
              <br />
              <strong>Điện thoại:</strong> 0123-456-789
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default KSHS;
