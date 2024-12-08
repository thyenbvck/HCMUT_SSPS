import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './report.css';
import AdminSidebar from '../../../components/adminSidebar';


const ReportAdmin = () => {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    // Giả sử bạn sẽ lấy dữ liệu báo cáo từ API
    fetchReports();
  }, []);

  // Giả lập API để lấy dữ liệu báo cáo
  const fetchReports = () => {
    // Đây là dữ liệu giả, bạn có thể thay bằng API thực tế
    const sampleReports = [
        { id: 1, title: 'Báo cáo in ấn tháng 12', date: '2024-12-01', status: 'Hoàn thành' },
        { id: 2, title: 'Báo cáo thanh toán tháng 11', date: '2024-11-25', status: 'Chờ duyệt' },
        { id: 3, title: 'Báo cáo sử dụng dịch vụ tháng 10', date: '2024-10-15', status: 'Hoàn thành' },
        { id: 4, title: 'Báo cáo in ấn tháng 9', date: '2024-09-30', status: 'Chờ duyệt' },
        { id: 5, title: 'Báo cáo thanh toán tháng 8', date: '2024-08-20', status: 'Hoàn thành' },
        { id: 6, title: 'Báo cáo sử dụng dịch vụ tháng 7', date: '2024-07-10', status: 'Chờ duyệt' },
        { id: 7, title: 'Báo cáo in ấn tháng 6', date: '2024-06-05', status: 'Hoàn thành' },
        { id: 8, title: 'Báo cáo thanh toán tháng 5', date: '2024-05-22', status: 'Chờ duyệt' },
        { id: 9, title: 'Báo cáo sử dụng dịch vụ tháng 4', date: '2024-04-18', status: 'Hoàn thành' },
        { id: 10, title: 'Báo cáo in ấn tháng 3', date: '2024-03-12', status: 'Chờ duyệt' },
    ];
    setReports(sampleReports);
  };

  return (
    
     <div className="report-container">
       
      <Helmet>
        <title>Báo cáo quản trị</title>
      </Helmet>
      <AdminSidebar/>
      <div className="report-content">
        <div className="report-header">
          <h1 className="report-title">Báo cáo quản trị</h1>
        </div>

        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên báo cáo</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.title}</td>
                  <td>{report.date}</td>
                  <td>{report.status}</td>
                  <td>
                    <Link to={`/admin/report-detail/${report.id}`} className="view-report-link">
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportAdmin;
