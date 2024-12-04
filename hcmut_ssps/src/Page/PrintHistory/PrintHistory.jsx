import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './printHistory.css'
import Sidebar from "../../components/Sidebar";
import printHistoryData from "../../hcmut_ssps_complex_data.json";  

const PrintHistory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, [navigate]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  useEffect(() => {
    if (user) {
      const filteredTransactions = printHistoryData.transactions.filter(
        (transaction) => transaction.student_id === user.student_id
      );
      setUserTransactions(filteredTransactions);
    }
  }, [user]);
  const handleTransactionClick = (transactionId) => {
    const transaction = userTransactions.find(
      (transaction) => transaction.transaction_id === transactionId
    );
    setSelectedTransaction(transaction);
  };

  return (
    <div className="info-container">
      <Helmet>
        <title>Lịch sử in ấn</title>
      </Helmet>
      <Sidebar />
      <div className="info-group4">
        <div className="info-pageheading">
          <span className="info-text1">Lịch sử in ấn</span>
        </div>
      </div>
      <div className="info-frame1">
        <table className="print-history-table">
          <thead>
            <tr>
              <th>Tên tệp</th>
              <th>Thời gian bắt đầu</th>
              <th>Thuộc tính in</th>
              <th>Số trang</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr
                key={transaction.transaction_id}
                onClick={() => handleTransactionClick(transaction.transaction_id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{transaction.file_name}</td>
                <td>{new Date(transaction.start_time).toLocaleString()}</td>
                <td>
                  <div>
                    <span>Giấy: {transaction.printing_properties.paper_size}</span>
                    <br />
                    <span>Số trang: {transaction.printing_properties.pages}</span>
                    <br />
                    <span>Số bản sao: {transaction.printing_properties.number_of_copies}</span>
                    <br />
                    <span>Hai mặt: {transaction.printing_properties.double_sided ? "Có" : "Không"}</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>A4: {transaction.pages_printed.A4}</span>
                    <br />
                    <span>A3: {transaction.pages_printed.A3}</span>
                    <br />
                    <span>A2: {transaction.pages_printed.A2}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTransaction && (
          <div className="transaction-detail">
            <h3>Chi tiết giao dịch {selectedTransaction.transaction_id}</h3>
            <p><strong>Tên tệp:</strong> {selectedTransaction.file_name}</p>
            <p><strong>Giấy:</strong> {selectedTransaction.printing_properties.paper_size}</p>
            <p><strong>Số trang:</strong> {selectedTransaction.printing_properties.pages}</p>
            <p><strong>Số bản sao:</strong> {selectedTransaction.printing_properties.number_of_copies}</p>
            <p><strong>Hai mặt:</strong> {selectedTransaction.printing_properties.double_sided ? "Có" : "Không"}</p>
            <p><strong>Số trang in:</strong></p>
            <ul>
              <li>A4: {selectedTransaction.pages_printed.A4}</li>
              <li>A3: {selectedTransaction.pages_printed.A3}</li>
              <li>A2: {selectedTransaction.pages_printed.A2}</li>
            </ul>
            <p><strong>Thời gian bắt đầu:</strong> {new Date(selectedTransaction.start_time).toLocaleString()}</p>
            <p><strong>Thời gian kết thúc:</strong> {new Date(selectedTransaction.end_time).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintHistory;
