// import React from "react";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./infoAdmin.css";
import AdminSidebar from "../../../components/adminSidebar";

const InfoAdmin = () => {
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

  return (
    <div className="info-container">
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <AdminSidebar />
      <div className="info-group4">
        <div className="info-pageheading">
          <span className="info-text1">Thông tin tài khoản</span>
        </div>
      </div>
      <div className="info-frame1" style={{ height: '40%' }}>

        {user ? (
          <table className="info-table">
            <tbody>
              <tr>
                <th>Họ và tên:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Số điện thoại:</th>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="info-no-data">Không có thông tin người dùng.</p>
        )}
      </div>
    </div>
  );
};

export default InfoAdmin;
