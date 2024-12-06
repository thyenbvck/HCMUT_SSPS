import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import AdminSidebar from "../../../components/adminSidebar";
import { Helmet } from "react-helmet";

const ConfigurationManage = () => {
  const [config, setConfig] = useState({
    current: {
      allowedFormats: [],
      allowedPaperSizes: [],
      supplyDate: "",
    },
    allFormats: [],
    allPaperSizes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/configuration-management");
        setConfig(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching configuration:", error);
        setError("Lỗi khi tải cấu hình. Vui lòng thử lại!");
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleFormatChange = (format) => {
    const updatedFormats = config.current.allowedFormats.includes(format)
      ? config.current.allowedFormats.filter((f) => f !== format)
      : [...config.current.allowedFormats, format];

    setConfig({
      ...config,
      current: { ...config.current, allowedFormats: updatedFormats },
    });
  };

  const handlePaperSizeChange = (size) => {
    const updatedPaperSizes = config.current.allowedPaperSizes.includes(size)
      ? config.current.allowedPaperSizes.filter((s) => s !== size)
      : [...config.current.allowedPaperSizes, size];

    setConfig({
      ...config,
      current: { ...config.current, allowedPaperSizes: updatedPaperSizes },
    });
  };

  const handleSupplyDateChange = (event) => {
    setConfig({
      ...config,
      current: { ...config.current, supplyDate: event.target.value },
    });
  };

  const saveConfiguration = async () => {
    try {
      await axios.put("http://localhost:3001/admin/configuration-management", {
        current: config.current
      });
      alert("Cấu hình đã được lưu thành công!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Lỗi khi lưu cấu hình. Vui lòng thử lại!");
    }
  };

  if (loading) return <div>Đang tải cấu hình...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="config-management-layout">
      <Helmet>
        <title>Quản lý cấu hình</title>
      </Helmet>
      <AdminSidebar />
      <div className="config-management-content">
        <h2 className="page-title">Quản lý Cấu hình</h2>
        <div className="config-section">
          <h4 className="config-section-title">Định dạng tài liệu cho phép upload</h4>
          <div className="config-options">
            {config.allFormats.map((format) => (
              <label key={format} className="config-checkbox-label">
                <input
                  type="checkbox"
                  checked={config.current.allowedFormats.includes(format)}
                  onChange={() => handleFormatChange(format)}
                  className="config-checkbox-input"
                />
                {format.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
        <div className="config-section">
          <h4 className="config-section-title">Kích thước giấy cho phép in</h4>
          <div className="config-options">
            {config.allPaperSizes.map((size) => (
              <label key={size} className="config-checkbox-label">
                <input
                  type="checkbox"
                  checked={config.current.allowedPaperSizes.includes(size)} 
                  onChange={() => handlePaperSizeChange(size)}
                  className="config-checkbox-input"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <div className="config-section">
          <h4 className="config-section-title">Ngày cung cấp trang hằng tháng</h4>
          <input
            type="date"
            value={config.current.supplyDate}
            onChange={handleSupplyDateChange}
            className="config-date-input"
          />
        </div>
        <button className="config-save-button" onClick={saveConfiguration}>
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
};

export default ConfigurationManage;
