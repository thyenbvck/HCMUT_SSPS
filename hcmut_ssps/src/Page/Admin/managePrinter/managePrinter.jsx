import React, { useState } from "react";
import data from "../../../hcmut_ssps_complex_data.json";
import '../style.css';
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from 'react-helmet';

const PrinterManagement = () => {
  const [printerList, setPrinterList] = useState(data.printers);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPrinter = () => {
    setPrinterList([...printerList, form]);
    setForm({ printer_id: "", name: "", type: "", location: "", status: "Ready" });
    setShowForm(false);
  };

  const handleEditPrinter = (printer) => {
    setEditingPrinter(printer.printer_id);
    setForm(printer);
    setShowForm(true);
  };

  const handleSavePrinter = () => {
    setPrinterList(
      printerList.map((printer) =>
        printer.printer_id === form.printer_id ? form : printer
      )
    );
    setEditingPrinter(null);
    setForm({ printer_id: "", name: "", type: "", location: "", status: "Ready" });
    setShowForm(false);
  };

  const handleDeletePrinter = (printer_id) => {
    setPrinterList(printerList.filter((printer) => printer.printer_id !== printer_id));
  };

  const handleToggleStatus = (printer_id) => {
    setPrinterList(
      printerList.map((printer) =>
        printer.printer_id === printer_id
          ? { ...printer, status: printer.status === "Ready" ? "Disabled" : "Ready" }
          : printer
      )
    );
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
