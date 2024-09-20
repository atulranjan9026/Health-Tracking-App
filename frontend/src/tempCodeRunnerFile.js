import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import AddHealthRecord from './components/AddHealthRecord';
import HealthRecordDetail from './components/HealthRecordDetail';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddHealthRecord />} />
          <Route path="/record/:id" element={<HealthRecordDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
