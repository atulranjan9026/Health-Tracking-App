import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './ProtectedRoute';

import Dashboard from './components/Dashboard';
import AddHealthRecord from './components/AddHealthRecord';
import HealthRecordDetail from './components/HealthRecordDetail';
import EditHealthRecord from './components/EditHealthRecord';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddHealthRecord />} />
            <Route path="/record/:id" element={<HealthRecordDetail />} />
            <Route path="/edit/:id" element={<EditHealthRecord />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
