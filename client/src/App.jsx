import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Complaint from './Pages/NewComplaint/Complaint';
import RegisterComplaint from './components/RegisterComplaint/RegisterComplaint';  // Corrected import and usage
import DepartmentComplaint from './components/DepartmentComplaint/DepartmentComplaint';
import Dashboard from './Pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary'; // <-- Import ErrorBoundary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/complaint"
          element={
            <PrivateRoute>
              <Layout>
                <Complaint />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/complaint/:departmentName"
          element={
            <PrivateRoute>
              <Layout>
                <DepartmentComplaint />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* New Route for RegisterComplaint */}
        <Route
          path="/register-complaint"
          element={
            <PrivateRoute>
              <Layout>
                <RegisterComplaint />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Wrap Dashboard with ErrorBoundary */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
