import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import "./PrintSelection.css";
import Sidebar from "../../../components/Sidebar";
// import document from "../../../assest/document.png";
// import printerData from "../../../hcmut_ssps_complex_data.json";
import axios from "axios";
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
const PrintSelection = () => {
  
  const [printer, setPrinter] = useState("");
  const [error,setError] = useState("");
  const [pageRange, setPageRange] = useState("all");
  const [copies, setCopies] = useState(1);
  const [isCollated, setIsCollated] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [file, setFile] = useState(null);
  const [allowedPaperSizes, setAllowedPaperSizes] = useState(null);
  const [paperSize, setPaperSize] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrinters = async () =>{
    try{
    const response = await axios.get("http://localhost:3001/student/print-selection");
        setPrinters(response.data.printers || []);
        setAllowedPaperSizes(response.data.allowedPaperSizes || []);
    }catch (error) {
      console.error("Error fetching ", error);
      setError("Lỗi khi tải máy in. Vui lòng thử lại!");
      }
    };
    fetchPrinters();
  }, []);

  const location = useLocation();
  const { file: fileLocation } = location.state || {};

  useEffect(() => {
    if (fileLocation) {
      setFile(fileLocation);
      if (fileLocation.type === "application/pdf") {
        getPdfPageCount(fileLocation);
      }
    }
  }, [fileLocation]);

  const getPdfPageCount = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Selected file is not a valid PDF.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const pdfData = new Uint8Array(fileReader.result);
        alert("PDF Data loaded successfully");

        const pdf = await getDocument(pdfData).promise;

        if (pdf) {
          alert(`PDF loaded successfully. Total Pages: ${pdf.numPages}`);
          setTotalPages(pdf.numPages);
        } else {
          console.error("Failed to load PDF document");
          alert("Failed to load PDF.");
        }
      } catch (error) {
        console.error("Error reading PDF file:", error);
        alert(`Error loading PDF: ${error.message}`);
      }
    };

    fileReader.onerror = () => {
      console.error("Error reading file:", fileReader.error);
      alert("Error reading the file.");
    };

    fileReader.readAsArrayBuffer(file);
  };
  const handleCancel = () => {
    navigate("/student/print-services");
  };
  const handlePrint = async () => {
    if (!printer) {
      alert("Vui lòng chọn máy in.");
      return;
    }
    const selectedPrinter = printers.find((p) => p.name === printer);
    if (!selectedPrinter) {
      alert("Không tìm thấy máy in.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      alert("Không tìm thấy thông tin người dùng.");
      return;
    }
    if (!paperSize) {
      alert("Vui lòng chọn kích thước giấy.");
      return;
    }
    const userAvailablePages = user.available_pages[paperSize];
    if (userAvailablePages === undefined) {
      alert("Không có thông tin về kích thước giấy này.");
      return;
    }
    let totalPagesToPrint = totalPages;
    if (pageRange === "pages") {
      const pageRangeInput = document.querySelector('input[placeholder="e.g., 1-3, 5"]');
      const pageRangeValue = pageRangeInput.value;
  
      if (pageRangeValue) {
        const pages = pageRangeValue.split(",").map((range) => {
          const [start, end] = range.split("-").map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }).flat();
        totalPagesToPrint = pages.length;
      }
    }
    const totalPagesRequired = totalPagesToPrint * copies;
    if (userAvailablePages < totalPagesRequired) {
      alert(`Không đủ trang ${paperSize} để in. Vui lòng mua thêm.`);
      return;
    }
    alert(`In:\nFile: ${file?.name || "Không có tên file"}\nMáy in: ${printer || "Không có máy in"}\nSố bản sao: ${copies}\nSố trang: ${totalPagesRequired}`);
    try {
      const updatedUser = {
        ...user,
        available_pages: {
          ...user.available_pages,
          [paperSize]: userAvailablePages - totalPagesRequired,
        },
        totalPages: user.totalPages + totalPagesRequired, 
      };
    
      await axios.post("http://localhost:3001/student/user/updatePageCount", {
        student_id: user.student_id,
        available_pages: updatedUser.available_pages,
        totalPages: updatedUser.totalPages,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      alert("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
    }
    // localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    try {
      const printHistoryId = `print-${Date.now()}`;
      const printTime = new Date().toISOString();
      await axios.post("http://localhost:3001/student/print-history", {
        id: printHistoryId,
        student_id: user.student_id,
        printerName: printer,
        fileName: file?.name,
        copies,
        pages: totalPagesToPrint,
        paperSize,
        collated: isCollated,
        time: printTime,
      });
      alert("Lịch sử in ấn đã được lưu.");
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử in:", error);
      alert("Không thể lưu lịch sử in. Vui lòng thử lại.");
    }
  };
  

  return (
    <div className="print-page2">
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="section information">
            <h3>Information</h3>
            <div className="info-row">
              <p><strong>Name:</strong> {file?.name || "No file selected"}</p>
              <p><strong>Size:</strong> {file?.size ? `${(file.size / 1024).toFixed(2)} KB` : "N/A"}</p>
              <p><strong>Time:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Type:</strong> {file?.type || "Unknown"}</p>
              <p><strong>Total Pages:</strong> {totalPages || "N/A"}</p>
            </div>
          </div>

          {/* Printer Section */}
          <div className="section printer">
            <h3>Printer</h3>
            <div className="printer-row">
              <label htmlFor="printer">Select Printer:</label>
              <select
                id="printer"
                value={printer}
                onChange={(e) => setPrinter(e.target.value)}
              >
                <option value="">--Select Printer--</option>
                {printers.map((printerItem) => (
                  <option key={printerItem.id} value={printerItem.name}>
                    {printerItem.name} - {printerItem.status}
                  </option>
                ))}
              </select>
            </div>
            <p>
              <strong>Status:</strong> {printer ? printers.find((p) => p.name === printer)?.status : "No printer selected"}
            </p>
            <p><strong>Type:</strong> {printer ? printers.find((p) => p.name === printer)?.type : "Unknown"}</p>
            <p><strong>Where:</strong> {printer ? printers.find((p) => p.name === printer)?.location : "Unknown"}</p>
          </div>

          <div className="page-range-copies-container">
            <div className="section page-range">
              <h3>Page Range</h3>
              <div className="range-options">
                <div className="row">
                  <label>
                    <input
                      type="radio"
                      name="pageRange"
                      value="all"
                      checked={pageRange === "all"}
                      onChange={(e) => setPageRange(e.target.value)}
                    />
                    All
                  </label>
                </div>
                <div className="row range-selection">
                  <label>
                    <input
                      type="radio"
                      name="pageRange"
                      value="range"
                      checked={pageRange === "range"}
                      onChange={(e) => setPageRange(e.target.value)}
                    />
                    Range
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="pageRange"
                      value="selection"
                      checked={pageRange === "selection"}
                      onChange={(e) => setPageRange(e.target.value)}
                    />
                    Selection
                  </label>
                </div>
                <div className="row">
                  <label>
                    <input
                      type="radio"
                      name="pageRange"
                      value="pages"
                      checked={pageRange === "pages"}
                      onChange={(e) => setPageRange(e.target.value)}
                    />
                    Pages:
                    <input
                      type="text"
                      placeholder="e.g., 1-3, 5"
                      disabled={pageRange !== "pages"}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="section copies">
              <h3>Copies</h3>
              <div className="copies-row">
                <label htmlFor="copies">Number of copies:</label>
                <input
                  id="copies"
                  type="number"
                  min="1"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                />
              </div>
              <div className="collate-option">
                <input
                  type="checkbox"
                  id="collate"
                  checked={isCollated}
                  onChange={(e) => setIsCollated(e.target.checked)}
                />
                <label htmlFor="collate">Collate</label>
              </div>
              <div className="paper-size-dropdown">
    <label htmlFor="paperSize">Select Paper Size:</label>
    <select
      id="paperSize"
      value={paperSize}
      onChange={(e) => setPaperSize(e.target.value)}
    >
      <option value="">--Select Paper Size--</option>
      {allowedPaperSizes?.map((size, index) => (
        <option key={index} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
            </div>
          </div>
          <div className="actions">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="print-button" onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSelection;
