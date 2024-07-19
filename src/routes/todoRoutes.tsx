import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Content from '../components/layout/Content';

const TodoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/all" />} />
      <Route path="/:filter" element={<Content />} />
    </Routes>
  );
};

export default TodoRoutes;
