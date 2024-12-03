import React from 'react';
import { Helmet } from 'react-helmet'
import './info.css'
import Sidebar from "../../components/Sidebar";
import dividerImage from './images/divider774-701.svg';
const info = () => {
  return (
    <div className="info-container">
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <Sidebar/>  
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
        <span className="info-text2" style={{ position: 'absolute', top: '50px', left: '50px' }}>Họ và tên: Nguyễn Văn A</span>
        <span className="info-text2" style={{ position: 'absolute', top: '130px', left: '50px' }}>Mã số sinh viên: 2212620</span>
        <span className="info-text2" style={{ position: 'absolute', top: '210px', left: '50px' }}>Email: A.nguyenvan@hcmut.edu.vn</span>
        <span className="info-text2" style={{ position: 'absolute', top: '290px', left: '50px' }}>Khoa: khoa học và kỹ thuật máy tính</span>
        <span className="info-text2" style={{ position: 'absolute', top: '370px', left: '50px' }}>Sđt: 0907111222</span>
        <span className="info-text2" style={{ position: 'absolute', top: '450px', left: '50px' }}>Số trang khả dụng: 20 trang</span>
        <span className="info-text2" style={{ position: 'absolute', top: '450px', left: '500px', textAlign: 'left' }}>
            <span>A4: 10 trang</span>
            <br></br>
            <span>A3: 5 trang</span>
            <br></br>
            <span>A2: 5 trang</span>
          </span>
      </div>
    </div>
  )
}

export default info;
