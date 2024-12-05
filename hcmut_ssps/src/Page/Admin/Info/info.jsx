import React from 'react';
import { Helmet } from 'react-helmet'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './info.css'
import AdminSidebar from '../../../components/adminSidebar';
import dividerImage from './images/divider774-701.svg';
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
      <AdminSidebar/>  
        <div className="info-group4">
            <div className="info-pageheading">
              <span className="info-text1">Thông tin tài khoản</span>
              <img
                src={dividerImage}
                alt="Divider774"
                className="info-divider"
              />
          </div>
        </div>
        <div className="info-frame1">
        {user && (
          <>
            <span className="info-text2" style={{ position: "absolute", top: "50px", left: "50px" }}>
              Họ và tên: {user.name}
            </span>
            <span className="info-text2" style={{ position: "absolute", top: "210px", left: "50px" }}>
              Email: {user.email}
            </span>
            <span className="info-text2" style={{ position: "absolute", top: "370px", left: "50px" }}>
              Sđt: {user.phone}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default InfoAdmin;
