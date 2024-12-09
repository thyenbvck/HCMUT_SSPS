import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import TPlogo from '../../../assest/TPBank.png';
import QR from '../../../assest/QR.png';
import MomoLogo from '../../../assest/momo.png';
import MomoQR from '../../../assest/QR_momo.jpg';
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

  const BankTransferDetails = () => (
    <div className="right-column">
      <h4>Thông tin chuyển khoản</h4>
      <div className="bank-info">
        <div className="bank-logo">
          <img src={TPlogo} alt="Bank Logo" />
        </div>
        <div className="bank-details">
          <p>TP Bank - Ngân hàng Tiên Phong</p>
          <p>Hoàng Mạnh Đức</p>
        </div>
      </div>
      <div className="account-info">
        <p>Số tài khoản:</p>
        <div className="account-details">
          <strong className="large-text">098765432111</strong>
          <button className="copy-button" onClick={() => handleCopy('098765432111')}>Sao chép</button>
        </div>
      </div>
      <div className="transfer-info">
        <p>Nội dung chuyển khoản:</p>
        <div className="transfer-details">
          <strong className="large-text">BKPayPrint001</strong>
          <button className="copy-button" onClick={() => handleCopy('BKPayPrint001')}>Sao chép</button>
        </div>
      </div>
      <div className="transfer-info">
        <p>Số tiền chuyển khoản:</p>
        <div className="transfer-details">
          <strong className="large-text">{total} VNĐ</strong>
        </div>
      </div>
      <div className="qr-code">
        <img src={QR} alt="QR Code" />
      </div>
    </div>
  );

  const MomoTransferDetails = () => (
    <div className="right-column">
      <h4>Thông tin chuyển khoản</h4>
      <div className="bank-info">
        <div className="bank-logo">
          <img src={MomoLogo} alt="Bank Logo" />
        </div>
        <div className="bank-details">
          <p>Momo</p>
          <p>Nguyễn Trịnh Ngọc Huân</p>
        </div>
      </div>
      <div className="account-info">
        <p>Số tài khoản:</p>
        <div className="account-details">
          <strong className="large-text">0346332560</strong>
          <button className="copy-button" onClick={() => handleCopy('0346332560')}>Sao chép</button>
        </div>
      </div>
      <div className="transfer-info">
        <p>Nội dung chuyển khoản:</p>
        <div className="transfer-details">
          <strong className="large-text">BKPayPrint001</strong>
          <button className="copy-button" onClick={() => handleCopy('BKPayPrint001')}>Sao chép</button>
        </div>
      </div>
      <div className="transfer-info">
        <p>Số tiền chuyển khoản:</p>
        <div className="transfer-details">
          <strong className="large-text">{total} VNĐ</strong>
        </div>
      </div>
      <div className="qr-code">
        <img src={MomoQR} alt="QR Code" />
      </div>
    </div>
  );

  const renderRightColumn = () => {
    switch (selectedMethod) {
      case 'Chuyển khoản ngân hàng':
        return <BankTransferDetails />;
      case 'Ví momo':
        return <MomoTransferDetails />;
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