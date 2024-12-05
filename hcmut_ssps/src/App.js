import React from 'react';
import { Route, Routes } from 'react-router-dom';

/*User Page*/
import Login from './Page/User/Login/login';
import PrintPage from './Page/User/PrintPage/printPage';
import PrintSelection from './Page/User/PrintSelection/PrintSelection';
import Info from './Page/User/Info/info';
import Payment from './Page/User/onlinePayment/onlinePayment';
import PrintHistory from './Page/User/PrintHistory/PrintHistory';

/*Admin Page */
import InfoAdmin from './Page/Admin/Info/info';
import AccountManagement from './Page/Admin/manageAccount/manageAccount';
import PrinterManagement from './Page/Admin/managePrinter/managePrinter';
import ProtectedRoute from './Page/User/Login/protectedRole';

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
    </Routes>
  );
};

export default App;
