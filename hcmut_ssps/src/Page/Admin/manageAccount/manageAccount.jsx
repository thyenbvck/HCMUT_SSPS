import React, { useState } from "react";
import data from "../../../hcmut_ssps_complex_data.json";
import '../style.css';
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from 'react-helmet';

const AccountManagement = () => {
  const [accountList, setAccountList] = useState(data.accounts); 
  const [editingAccount, setEditingAccount] = useState(null);
  const [form, setForm] = useState({
    student_id: "",
    name: "",
    email: "",
    department: "",
    phone: "",
    monthlyPage: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 3; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddAccount = () => {
    setAccountList([...accountList, { ...form, role: "student" }]);  
    setForm({ student_id: "", name: "", email: "", department: "", phone: "", monthlyPage: "" });
    setShowForm(false);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account.student_id);
    setForm(account);
    setShowForm(true);
  };

  const handleSaveAccount = () => {
    setAccountList(accountList.map(account =>
      account.student_id === form.student_id ? form : account  
    ));
    setEditingAccount(null);
    setForm({ student_id: "", name: "", email: "", department: "", phone: "", monthlyPage: "" });
    setShowForm(false);
  };

  const handleDeleteAccount = (student_id) => {
    setAccountList(accountList.filter(account => account.student_id !== student_id));  
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
      <input
        type="text"
        name="student_id"
        placeholder="Mã sinh viên"
        value={form.student_id}
        onChange={handleInputChange}
        disabled={editingAccount ? true : false}
      />
      <input
        type="text"
        name="name"
        placeholder="Tên"
        value={form.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Khoa"
        value={form.department}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Số điện thoại"
        value={form.phone}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="monthlyPage"
        placeholder="Trang cung cấp mỗi tháng"
        value={form.monthlyPage}
        onChange={handleInputChange}
      />
      {editingAccount ? (
        <button type="button" onClick={handleSaveAccount}>Lưu</button>
      ) : (
        <button type="button" onClick={handleAddAccount}>Thêm tài khoản</button>
      )}
    </form>
  );

  return (
    <div className="management-wrapper">
      <Helmet>
        <title>Quản lý tài khoản</title>
      </Helmet>
      <AdminSidebar />
      <div className="account-content">
        <h3>{editingAccount ? "Chỉnh sửa tài khoản" : "Danh sách tài khoản sinh viên"}</h3>
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
                    <button onClick={() => handleEditAccount(account)}>Sửa</button>
                    <button onClick={() => handleDeleteAccount(account.student_id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination">
          <button 
            className="pagination-button" 
            onClick={prevPage} 
            disabled={currentPage === 1}>
            &#60; Trước
          </button>
          <button 
            className="pagination-button" 
            onClick={nextPage} 
            disabled={currentPage === Math.ceil(accountList.length / accountsPerPage)}>
            Sau &#62;
          </button>
        </div>

        {!showForm && (
          <button onClick={() => setShowForm(true)}>Thêm tài khoản</button>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
