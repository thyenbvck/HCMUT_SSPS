import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style.css';
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from 'react-helmet';

const AccountManagement = () => {
  const [accountList, setAccountList] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    name: "",
    email: "",
    password: "",
    department: "",
    phone: "",
    monthlyPage: "",
  });
  const [errors, setErrors] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // Track if we're editing
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 4;

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/account-management");
      setAccountList(response.data);
    } catch (error) {
      console.error("Error fetching account list:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors("");
  };

  const validateForm = () => {
    if (!form.student_id || !form.name || !form.email || !form.department || !form.phone || !form.monthlyPage || !form.password) {
      return "Thiếu thông tin tại một hoặc nhiều trường!";
    }
    return "";
  };

  const handleAddOrUpdateAccount = async () => {
    const errorMessage = validateForm();
    if (!errorMessage) {
      try {
        if (isEditing) {
          await axios.put(`http://localhost:3001/admin/account-management/${form.student_id}`, form);
        } else {
          await axios.post("http://localhost:3001/admin/account-management", {
            ...form,
            role: "student",
            available_pages: {
              A4: 20,
              A3: 20,
              A2: 20,
            },
          });
        }
        fetchAccounts();  // Fetch updated list after adding or updating
        setForm({
          student_id: "",
          name: "",
          email: "",
          password: "",
          department: "",
          phone: "",
          monthlyPage: "",
        });
        setShowForm(false); // Close the form
        setIsEditing(false); // Reset editing state after form submission
      } catch (error) {
        console.error("Error adding or updating account:", error);
      }
    } else {
      setErrors(errorMessage);
    }
  };

  const handleDeleteAccount = async (student_id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/account-management/${student_id}`);
      fetchAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleEditAccount = (account) => {
    setForm(account);  // Populate form with account data for editing
    setShowForm(true);
    setIsEditing(true);  // Mark as editing
  };

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = accountList.slice(indexOfFirstAccount, indexOfLastAccount);

  const nextPage = () => {
    if (currentPage < Math.ceil(accountList.length / accountsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderForm = () => (
    <form>
      <div className="form-group">
        <input
          type="text"
          name="student_id"
          placeholder="Mã sinh viên"
          value={form.student_id}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="department"
          placeholder="Khoa"
          value={form.department}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          name="monthlyPage"
          placeholder="Trang cung cấp mỗi tháng"
          value={form.monthlyPage}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleInputChange}
        />
      </div>

      {errors && <div className="error">{errors}</div>} {/* Display generic error message */}
      <button type="button" onClick={handleAddOrUpdateAccount}>
        {isEditing ? "Cập nhật tài khoản" : "Thêm tài khoản"}
      </button>
      <button type="button" onClick={() => setShowForm(false)}>Trở về</button>
    </form>
  );

  return (
    <div className="management-wrapper">
      <Helmet>
        <title>Quản lý tài khoản</title>
      </Helmet>
      <AdminSidebar />
      <div className="account-content">
        <h3>Danh sách tài khoản sinh viên</h3>
        {showForm && renderForm()}
        {!showForm && (
          <table>
            <thead>
              <tr>
                <th>Mã sinh viên</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Khoa</th>
                <th>Số điện thoại</th>
                <th>Trang cung cấp</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentAccounts.filter(account => account.role === "student").map((account) => (
                <tr key={account.student_id}>
                  <td>{account.student_id}</td>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.department}</td>
                  <td>{account.phone}</td>
                  <td>{account.monthlyPage || "0"}</td>
                  <td>
                    <button onClick={() => handleEditAccount(account)}>Chỉnh sửa</button>
                    <button onClick={() => handleDeleteAccount(account.student_id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!showForm && (
          <>
            <div className="pagination">
              <button 
                className="pagination-button" 
                onClick={prevPage} 
                disabled={currentPage === 1}>
                &#60;Trước
              </button>
              <button 
                className="pagination-button" 
                onClick={nextPage} 
                disabled={currentPage === Math.ceil(accountList.length / accountsPerPage)}>
                Sau &#62;
              </button>
            </div>
            <button 
              onClick={() => {
                setShowForm(true);
                setForm({
                  student_id: "",
                  name: "",
                  email: "",
                  password: "",
                  department: "",
                  phone: "",
                  monthlyPage: "",
                });
                setIsEditing(false); // Reset editing state when adding new account
              }}
            >
              Thêm tài khoản
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
