import React from 'react';
import { Route, Routes } from 'react-router-dom';

/*User Page*/
import Login from './Page/User/Login/login';
import PrintPage from './Page/User/PrintPage/printPage';
import PrintSelection from './Page/User/PrintSelection/PrintSelection';
import Info from './Page/User/Info/info';
import Payment from './Page/User/onlinePayment/onlinePayment';
import PrintHistory from './Page/User/PrintHistory/PrintHistory';
import BuyPage from './Page/User/buyPage/buyPage'
import ThanhToan from './Page/User/buyPage/ThanhToan';
import SupportUser from './Page/User/Support/support';
import KSHS from './Page/User/KSHS/KSHS';
import Noti from './Page/User/Noti/noti';
import Setting from './Page/User/Setting/setting';
/*Admin Page */
import InfoAdmin from './Page/Admin/Info/info';
import AccountManagement from './Page/Admin/manageAccount/manageAccount';
import PrinterManagement from './Page/Admin/managePrinter/managePrinter';
import ProtectedRoute from './Page/User/Login/protectedRole';
import ReportAdmin from './Page/Admin/Report/report';
import SupportAdmin from './Page/Admin/Support/support';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/admin-info"
        element={
          <ProtectedRoute role="admin">
            <InfoAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/account-management"
        element={
          <ProtectedRoute role="admin">
            <AccountManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/printer-management"
        element={
          <ProtectedRoute role="admin">
            <PrinterManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute role="admin">
            <ReportAdmin />
          </ProtectedRoute>
        }
      />
            <Route
        path="/admin/support"
        element={
          <ProtectedRoute role="admin">
            <SupportAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/print-services"
        element={
          <ProtectedRoute role="student">
            <PrintPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/print-selection"
        element={
          <ProtectedRoute role="student">
            <PrintSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/account-info"
        element={
          <ProtectedRoute role="student">
            <Info />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/buy-pages"
        element={
          <ProtectedRoute role="student">
            <BuyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/thanh-toan"
        element={
          <ProtectedRoute role="student">
            <ThanhToan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/payment"
        element={
          <ProtectedRoute role="student">
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/History"
        element={
          <ProtectedRoute role="student">
            <PrintHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/support"
        element={
          <ProtectedRoute role="student">
            <SupportUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/kshs"
        element={
          <ProtectedRoute role="student">
            <KSHS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute role="student">
            <Noti />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/settings"
        element={
          <ProtectedRoute role="student">
            <Setting />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
