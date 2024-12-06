import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import "./PrintSelection.css";
import Sidebar from "../../../components/Sidebar";
import document from "../../../assest/document.png";
import printerData from "../../../hcmut_ssps_complex_data.json";
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
const PrintSelection = () => {
  
  const [printer, setPrinter] = useState("");
  const [pageRange, setPageRange] = useState("all");
  const [copies, setCopies] = useState(1);
  const [isCollated, setIsCollated] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setPrinters(printerData.printers);
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

  const handlePrint = () => {
    if (pageRange === "pages" && (parseInt(pageRange.split("-")[1]) > totalPages)) {
      alert(`Error: Page range exceeds total pages of the document.`);
    } else {
      alert(`Printing:\nFile: ${file?.name || "Unknown"}\nPrinter: ${printer || "No printer selected"}\nCopies: ${copies}\nPage Range: ${pageRange}`);
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
              <p><strong>Total Pages:</strong> {totalPages || "N/A"}</p> {/* Display total pages */}
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

                {/* Pages Input */}
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
            </div>
          </div>
          <div className="actions">
            <button className="cancel-button" onClick={() => alert("Print Cancelled")}>
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
