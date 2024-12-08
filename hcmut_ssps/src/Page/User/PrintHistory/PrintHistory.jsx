import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './printHistory.css'
import Sidebar from "../../../components/Sidebar";

const PrintHistory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    if (user) {
      const fetchPrintHistory = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/student/print-history/${user.student_id}`);
          setUserTransactions(response.data.printHistory || []);
        } catch (error) {
          console.error("Error fetching print history data:", error);
        }
      };

      fetchPrintHistory();
    }
  }, [user]);

  const handleTransactionClick = (transactionId) => {
    const transaction = userTransactions.find(
      (transaction) => transaction.id === transactionId
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
              {/* <th>Số trang</th> */}
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleTransactionClick(transaction.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{transaction.fileName}</td>
                <td>{new Date(transaction.time).toLocaleString()}</td>
                <td>
                  <div>
                    <span>Giấy: {transaction.paperSize}</span>
                    <br />
                    <span>Số trang: {transaction.pages}</span>
                    <br />
                    <span>Số bản sao: {transaction.copies}</span>
                    <br />
                    <span>Hai mặt: {transaction.collated ? "Có" : "Không"}</span>
                  </div>
                </td>
                {/* <td>
                  <div>
                    <span>A4: {transaction.pagesA4}</span>
                    <br />
                    <span>A3: {transaction.pagesA3}</span>
                    <br />
                    <span>A2: {transaction.pagesA2}</span>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* {selectedTransaction && (
          <div className="transaction-detail">
            <h3>Chi tiết giao dịch {selectedTransaction.id}</h3>
            <p><strong>Tên tệp:</strong> {selectedTransaction.fileName}</p>
            <p><strong>Giấy:</strong> {selectedTransaction.paperSize}</p>
            <p><strong>Số trang:</strong> {selectedTransaction.pages}</p>
            <p><strong>Số bản sao:</strong> {selectedTransaction.copies}</p>
            <p><strong>Hai mặt:</strong> {selectedTransaction.collated ? "Có" : "Không"}</p>
            <p><strong>Số trang in:</strong></p>
            <ul>
              <li>A4: {selectedTransaction.pagesA4}</li>
              <li>A3: {selectedTransaction.pagesA3}</li>
              <li>A2: {selectedTransaction.pagesA2}</li>
            </ul>
            <p><strong>Thời gian bắt đầu:</strong> {new Date(selectedTransaction.time).toLocaleString()}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PrintHistory;
