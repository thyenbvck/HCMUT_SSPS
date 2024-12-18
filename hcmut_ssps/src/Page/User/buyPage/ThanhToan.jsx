import React from 'react';
import Sidebar from '../../../components/Sidebar';
import TPlogo from '../../../assest/TPBank.png';
import QR from '../../../assest/QR.png'
import './design.css'; 

function ThanhToan() {
    return (
        <div className="thanh-toan">
            <Sidebar />

            <div className="main-content">
                <h2>Thanh toán</h2>

                <div className="payment-container">
                    <div className="payment-info">
                        <h3>Phương thức thanh toán</h3>
                        <div className="method">
                            <input type="radio" id="bank-transfer" name="payment" defaultChecked />
                            <label htmlFor="bank-transfer">Chuyển khoản ngân hàng</label>
                        </div>
                        <div className="method">
                            <input type="radio" id="atm-card" name="payment" />
                            <label htmlFor="atm-card">Thẻ ATM/Thẻ nội địa</label>
                        </div>
                        <div className="method">
                            <input type="radio" id="vi-momo" name="payment" />
                            <label htmlFor="vi-momo">Ví momo</label>
                        </div>
                        <div className="method">
                            <input type="radio" id="bk-pay" name="payment" />
                            <label htmlFor="bk-pay">BK Pay</label>
                        </div>

                        <h3>Thông tin chuyển khoản</h3>
                        <div className="bank-logo">
                            <img src={TPlogo} alt="TP Bank Logo" />
                            <p>TP Bank - Ngân hàng Tiên Phong</p>
                            <p>Hoàng Mạnh Đức</p>
                        </div>
                        <div className="account-details">
                            <p>Số tài khoản:</p>
                            <p className="account-number">098765432111</p>
                            <button className="copy-button">Sao chép</button>
                        </div>
                        <div className="transfer-content">
                            <p>Nội dung chuyển khoản:</p>
                            <p className="transfer-code">BKPayPrint001</p>
                            <button className="copy-button">Sao chép</button>
                        </div>
                        <div className="amount">
                            <p>Số tiền chuyển khoản:</p>
                            <p className="amount-value">69.000 VNĐ</p>
                        </div>
                    </div>
                    <div className="qr-section">
                        <p>Hỗ trợ quét mã QR Code từ các app ngân hàng, momo, ZaloPay</p>
                        <div className="qr-code">
                            <img src={QR} alt="QR Code" />
                            <p>QR Code</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThanhToan;
