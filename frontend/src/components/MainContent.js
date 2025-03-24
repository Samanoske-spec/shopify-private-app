import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';

function MainContent() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </main>
  );
}

export default MainContent;