import React, { useState, useEffect } from "react";
import axios from "axios"; // Thư viện để gọi API
import '../style.css';
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from 'react-helmet';

const AccountManagement = () => {
  const [accountList, setAccountList] = useState([]);
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

  // Lấy danh sách tài khoản từ API
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/account-management");
      setAccountList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản:", error);
    }
  };

  // Tải danh sách tài khoản khi component được mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddAccount = async () => {
    try {
      await axios.post("http://localhost:3001/admin/account-management", {
        ...form,
        role: "student",
      });
      fetchAccounts(); // Tải lại danh sách tài khoản sau khi thêm
      setForm({ student_id: "", name: "", email: "", department: "", phone: "", monthlyPage: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account.student_id);
    setForm(account);
    setShowForm(true);
  };

  const handleSaveAccount = async () => {
    try {
      await axios.put(
        `http://localhost:3001/admin/account-management/${form.student_id}`,
        form
      );
      fetchAccounts(); // Tải lại danh sách tài khoản sau khi cập nhật
      setEditingAccount(null);
      setForm({ student_id: "", name: "", email: "", department: "", phone: "", monthlyPage: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
    }
  };

  const handleDeleteAccount = async (student_id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/account-management/${student_id}`);
      fetchAccounts(); // Tải lại danh sách tài khoản sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
    }
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
