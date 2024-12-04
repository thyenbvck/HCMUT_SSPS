import React, { useState } from "react";
import "./PrintSelection.css"; // Add CSS styles for the design
import Sidebar from "../../components/Sidebar";
import document from "../../assest/document.png"
const PrintSelection = ({ file }) => {
  const [printer, setPrinter] = useState("");
  const [pageRange, setPageRange] = useState("all");
  const [copies, setCopies] = useState(1);
  const [isCollated, setIsCollated] = useState(false);

  const handlePrint = () => {
    alert(`Printing:
    File: ${file?.name || "Unknown"}
    Printer: ${printer || "No printer selected"}
    Copies: ${copies}
    Page Range: ${pageRange}`);
  };

  return (
    <div className="print-page2">
        <div className="main-container">
    <Sidebar /> {/* Sidebar bên trái */}
    <div className="content-container">
      <div className="section information">
        <h3>Information</h3>
        <div className="info-row">
          <p><strong>Name:</strong> {file?.name || "No file selected"}</p>
          <p><strong>Size:</strong> {file?.size ? `${(file.size / 1024).toFixed(2)} KB` : "N/A"}</p>
          <p><strong>Time:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Type:</strong> {file?.type || "Unknown"}</p>
        </div>
      </div>

      {/* Printer Section */}
      <div className="section printer">
        <h3>Printer</h3>
        <div className="printer-row">
          <label htmlFor="printer">Name:</label>
          <input
            id="printer"
            type="text"
            placeholder="Input Printer Name"
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
          />
          <button className="properties-button">Properties</button>
        </div>
        <p><strong>Status:</strong> Ready</p>
        <p><strong>Type:</strong> Brother HL-4000N Series</p>
        <p><strong>Where:</strong> H6 - 601</p>
      </div>
      <div className="page-range-copies-container">
  {/* Page Range Section */}
  <div className="section page-range">
  <h3>Page Range</h3>
  <div className="range-options">
    {/* Row 1: All */}
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

    {/* Row 2: Range and Selection */}
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

    {/* Row 3: Pages */}
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


  {/* Copies Section */}
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
  <div className="checkbox-container">
  <div className="document-preview">
    <img src={document} alt="Document 1" />
    <img src={document} alt="Document 2" />
    <img src={document} alt="Document 3" />
  </div>
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
</div>


      {/* Actions */}
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
