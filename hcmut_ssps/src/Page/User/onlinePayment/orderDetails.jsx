import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './orderDetails.css';

function OrderDetails() {
  const navigate = useNavigate();

  const paperTypes = ["A0", "A1", "A2", "A3", "A4"];

  // Sample JSON data
  const orders = [
    {
      ID: "HCMUT001",
      type: "A4",
      numberOfPages: 1,
      pricePerPage: 1000, 
      status: true
    },
    {
      ID: "HCMUT002",
      type: "A4",
      numberOfPages: 5,
      pricePerPage: 1000, 
      status: false
    },
    {
        ID: "HCMUT003",
        type: "A1",
        numberOfPages: 5,
        pricePerPage: 10000, 
        status: true
    }
  ];

  const handlePayment = (total) => {
    navigate('/payment', { state: { total } });
  };

  const handlePaymentAll = () => {
    const total = orders.reduce((sum, order) => {
      return order.status ? sum + (order.numberOfPages * order.pricePerPage) : sum;
    }, 0);
    navigate('/payment', { state: { total } });
  };

  return (
    <div className="order-details-container">
      <Sidebar />
      <main className="order-details-main">
        <h2>Tạo đơn hàng</h2>
        <div className="order-details-header">
          <div className="order-details-label">
            <label>Loại giấy:</label>
            <select>
              {paperTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="order-details-label">
            <label>Số lượng:</label>
            <input type="number" min="1" placeholder="Nhập số lượng" />
          </div>
        </div>
        <h3>
          <span role="img" aria-label="Clipboard">
            📄 
          </span>
          Đơn thanh toán
        </h3>
        <table className="order-details-table">
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>Loại giấy</th>
              <th>Số trang</th>
              <th>Đơn giá</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const total = `${order.numberOfPages * order.pricePerPage} VNĐ`;
              return (
                <tr key={index}>
                  <td>{order.ID}</td>
                  <td>{order.type}</td>
                  <td>{order.numberOfPages}</td>
                  <td>{order.pricePerPage} VNĐ</td>
                  <td>{total}</td>
                  <td>
                    <button 
                      className={`payment-button ${order.status ? '' : 'disabled'}`}
                      disabled={!order.status}
                      onClick={() => handlePayment(order.numberOfPages * order.pricePerPage)}
                    >
                      {order.status ? 'Thanh toán' : 'Đã thanh toán'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="payment-all-button" onClick={handlePaymentAll}>Thanh toán tất cả</button>
      </main>
    </div>
  );
}

export default OrderDetails;