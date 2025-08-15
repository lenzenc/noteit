import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notes" element={<div>Notes Page (Coming Soon)</div>} />
        <Route path="tasks" element={<div>Tasks Page (Coming Soon)</div>} />
        <Route path="due-today" element={<div>Due Today Page (Coming Soon)</div>} />
        <Route path="textmate" element={<div>TextMate Files Page (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
};

export default App;