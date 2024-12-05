import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from "react-helmet";

const PrinterManagement = () => {
  const [printerList, setPrinterList] = useState([]);
  const [editingPrinter, setEditingPrinter] = useState(null);
  const [form, setForm] = useState({
    printer_id: "",
    name: "",
    type: "",
    location: "",
    status: "Ready",
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const printersPerPage = 3;

  // Load danh sách máy in từ server khi component được mount
  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/printer-management");
      setPrinterList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách máy in:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPrinter = async () => {
    try {
      await axios.post("http://localhost:3001/admin/printer-management", form);
      fetchPrinters();
      setForm({ printer_id: "", name: "", type: "", location: "", status: "Ready" });
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm máy in:", error);
    }
  };

  const handleEditPrinter = (printer) => {
    setEditingPrinter(printer.printer_id);
    setForm(printer);
    setShowForm(true);
  };

  const handleSavePrinter = async () => {
    try {
      await axios.put(
        `http://localhost:3001/admin/printer-management/${form.printer_id}`,
        form
      );
      fetchPrinters();
      setEditingPrinter(null);
      setForm({ printer_id: "", name: "", type: "", location: "", status: "Ready" });
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi lưu máy in:", error);
    }
  };

  const handleDeletePrinter = async (printer_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa máy in này?")) {
      try {
        await axios.delete(`http://localhost:3001/admin/printer-management/${printer_id}`);
        fetchPrinters();
      } catch (error) {
        console.error("Lỗi khi xóa máy in:", error);
      }
    }
  };

  const handleToggleStatus = async (printer_id) => {
    try {
      const printer = printerList.find((p) => p.printer_id === printer_id);
      const updatedStatus = printer.status === "Ready" ? "Disabled" : "Ready";
      const updatedPrinter = { ...printer, status: updatedStatus };
      await axios.put(`http://localhost:3001/admin/printer-management/${printer_id}`, updatedPrinter);
      fetchPrinters();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái máy in:", error);
    }
  };

  const indexOfLastPrinter = currentPage * printersPerPage;
  const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
  const currentPrinters = printerList.slice(indexOfFirstPrinter, indexOfLastPrinter);

  const nextPage = () => {
    if (currentPage < Math.ceil(printerList.length / printersPerPage)) {
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
        name="printer_id"
        placeholder="Mã máy in"
        value={form.printer_id}
        onChange={handleInputChange}
        disabled={editingPrinter ? true : false}
      />
      <input
        type="text"
        name="name"
        placeholder="Tên máy in"
        value={form.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Loại máy in"
        value={form.type}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Vị trí máy in"
        value={form.location}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Trạng thái"
        value={form.status}
        onChange={handleInputChange}
      />
      <button type="button" onClick={editingPrinter ? handleSavePrinter : handleAddPrinter}>
        {editingPrinter ? "Lưu" : "Thêm máy in"}
      </button>
      <button type="button" onClick={() => setShowForm(false)}>Trở về</button>
    </form>
  );

  return (
    <div className="management-wrapper">
      <Helmet>
        <title>Quản lý máy in</title>
      </Helmet>
      <AdminSidebar />
      <div className="printer-content">
        <h3>{editingPrinter ? "Chỉnh sửa máy in" : "Danh sách máy in"}</h3>
        {showForm && renderForm()}
        {!showForm && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Mã máy in</th>
                  <th>Tên máy in</th>
                  <th>Loại máy in</th>
                  <th>Vị trí</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentPrinters.map((printer) => (
                  <tr key={printer.printer_id}>
                    <td>{printer.printer_id}</td>
                    <td>{printer.name}</td>
                    <td>{printer.type}</td>
                    <td>{printer.location}</td>
                    <td>{printer.status}</td>
                    <td>
                      <button onClick={() => handleEditPrinter(printer)}>Sửa</button>
                      <button onClick={() => handleDeletePrinter(printer.printer_id)}>Xóa</button>
                      <button onClick={() => handleToggleStatus(printer.printer_id)}>
                        {printer.status === "Ready" ? "Vô hiệu hóa" : "Kích hoạt"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                &#60; Trước
              </button>
              <button
                className="pagination-button"
                onClick={nextPage}
                disabled={currentPage === Math.ceil(printerList.length / printersPerPage)}
              >
                Sau &#62;
              </button>
            </div>
            <button onClick={() => setShowForm(true)}>Thêm máy in</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PrinterManagement;
