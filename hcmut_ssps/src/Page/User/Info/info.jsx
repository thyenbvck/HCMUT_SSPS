// import React from 'react';
// import { Helmet } from 'react-helmet'
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './info.css'
// import Sidebar from '../../../components/Sidebar';
// import dividerImage from './images/divider774-701.svg';
// const Info = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const user = localStorage.getItem("userInfo");
//     if (user) {
//       setUser(JSON.parse(user));
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <div className="info-container">
//       <Helmet>
//         <title>Thông tin tài khoản</title>
//       </Helmet>
//       <Sidebar/>  
//         <div className="info-group4">
//             <div className="info-pageheading">
//               <span className="info-text1">Thông tin tài khoản</span>
//               <img
//                 src={dividerImage}
//                 alt="Divider774"
//                 className="info-divider"
//               />
//           </div>
//         </div>
//         <div className="info-frame1">
//         {user && (
//           <>
//             <span className="info-text2" style={{ position: "absolute", top: "50px", left: "50px" }}>
//               Họ và tên: {user.name}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "130px", left: "50px" }}>
//               Mã số sinh viên: {user.student_id}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "210px", left: "50px" }}>
//               Email: {user.email}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "290px", left: "50px" }}>
//               Khoa: {user.department}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "370px", left: "50px" }}>
//               Sđt: {user.phone}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "450px", left: "50px" }}>
//               Số trang khả dụng: {user.available_pages.total_pages} trang
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "450px", left: "500px", textAlign: "left" }}>
//               <span>A4: {user.available_pages.A4}</span>
//               <br />
//               <span>A3: {user.available_pages.A3}</span>
//               <br />
//               <span>A2: {user.available_pages.A2}</span>
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Info;
//----------------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './info.css';
// import Sidebar from '../../../components/Sidebar';
// import dividerImage from './images/divider774-701.svg';
// import axios from 'axios';
// import { Helmet } from 'react-helmet';
// const Info = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");

//     if (storedUser) {
//       const { student_id } = JSON.parse(storedUser); 
//       fetchUserData(student_id);
//     } else {
//       navigate("/"); 
//     }
//   }, [navigate]);
//   const fetchUserData = async (student_id) => {
//     try {
//       const response = await axios(`http://localhost:3001/student/user/${student_id}`);
//       const data = response.data;  // Axios automatically parses JSON responses into 'data'
  
//       if (response.status === 200) {
//         setUser(data); // Set the user data in state if API call is successful
//       } else {
//         console.error(data.message); // Handle error (e.g., user not found)
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error); // Handle network error
//     }
//   };
  

//   return (
//     <div className="info-container">
//       <Helmet>
//         <title>Thông tin tài khoản</title>
//       </Helmet>
//       <Sidebar />
//       <div className="info-group4">
//         <div className="info-pageheading">
//           <span className="info-text1">Thông tin tài khoản</span>
//           <img src={dividerImage} alt="Divider774" className="info-divider" />
//         </div>
//       </div>
//       <div className="info-frame1">
//         {user && (
//           <>
//             <span className="info-text2" style={{ position: "absolute", top: "50px", left: "50px" }}>
//               Họ và tên: {user.name}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "130px", left: "50px" }}>
//               Mã số sinh viên: {user.student_id}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "210px", left: "50px" }}>
//               Email: {user.email}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "290px", left: "50px" }}>
//               Khoa: {user.department}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "370px", left: "50px" }}>
//               Sđt: {user.phone}
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "450px", left: "50px" }}>
//               <span className='title'>Số trang khả dụng:</span>
//               <span>A4: {user.available_pages.A4} Trang </span>
//               <br />
//               <span>A3: {user.available_pages.A3} Trang</span>
//               <br />
//               <span>A2: {user.available_pages.A2} Trang</span>
//             </span>
//             <span className="info-text2" style={{ position: "absolute", top: "450px", left: "500px", textAlign: "left" }}>
           
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Info;
//----------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./info.css";
import Sidebar from "../../../components/Sidebar";
import dividerImage from "./images/divider774-701.svg";

// const Info = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");

//     if (storedUser) {
//       const { student_id } = JSON.parse(storedUser);
//       fetchUserData(student_id);
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   const fetchUserData = async (student_id) => {
//     try {
//       console.log("Đang gọi API với student_id:", student_id);
//       const response = await axios.get(`http://localhost:3001/student/user/${student_id}`);
//       console.log("Kết quả API:", response);
  
//       if (response.status === 200) {
//         setUser(response.data);
//       } else {
//         console.error("API trả về lỗi:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error.message);
//     }
//   };
  const Info = () => {
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
      <Sidebar />
      <div className="info-group4">
        <div className="info-pageheading">
        <span className="info-text1">Thông tin tài khoản</span>
          <img src={dividerImage} alt="Divider" className="info-divider" />
        </div>
      </div>
      <div className="info-frame1">
        {user ? (
          
            <table className="info-table">
              <tbody>
                <tr>
                  <th>Họ và tên</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Mã số sinh viên</th>
                  <td>{user.student_id}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Khoa</th>
                  <td>{user.department}</td>
                </tr>
                <tr>
                  <th>Số điện thoại</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Số trang khả dụng</th>
                  <td>
                    A4: {user.available_pages.A4} trang <br />
                    A3: {user.available_pages.A3} trang <br />
                    A2: {user.available_pages.A2} trang
                  </td>
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

export default Info;

