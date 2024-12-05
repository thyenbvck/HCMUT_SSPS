import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './onlinePayment.css';

function Payment() {
  const location = useLocation();
  const { total } = location.state || { total: '0 VNĐ' };
  const [selectedMethod, setSelectedMethod] = useState('Chuyển khoản ngân hàng');

  const paymentMethods = [
    "Chuyển khoản ngân hàng",
    "Ví momo",
    "BkPay"
  ];

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  const renderRightColumn = () => {
    switch (selectedMethod) {
      case 'Chuyển khoản ngân hàng':
        return (
          <div className="right-column">
            <h4>Thông tin chuyển khoản</h4>
            <p>TP Bank - Ngân hàng Tiên Phong</p>
            <p>Hoàng Mạnh Đức</p>
            <p>Số tài khoản: <strong>098765432111</strong> <button onClick={() => handleCopy('098765432111')}>Sao chép</button></p>
            <p>Nội dung chuyển khoản: <strong>BKPayPrint001</strong> <button onClick={() => handleCopy('BKPayPrint001')}>Sao chép</button></p>
            <p>Số tiền chuyển khoản: <strong>{total} VNĐ</strong></p>
          </div>
        );
      case 'Ví momo':
        return (
          <div className="right-column">
            <h4>Ví momo</h4>
            <p>Số tiền chuyển khoản: <strong>{total}</strong></p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <Sidebar />
      <main className="payment-main">
        <h2>Thanh toán</h2>
        <div className="payment-method">
          <div className="columns">
            <div className="left-column">
              <h3>Phương thức thanh toán</h3>
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(method)}
                >
                  {method}
                </div>
              ))}
            </div>
            {renderRightColumn()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Payment;