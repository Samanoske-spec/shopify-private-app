import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink 
        to="/products" 
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : ''}`
        }
      >
        Products
      </NavLink>
      <NavLink 
        to="/orders" 
        className={({ isActive }) => 
          `nav-item ${isActive ? 'active' : ''}`
        }
      >
        Orders
      </NavLink>
      {/* Add more navigation items here */}
    </nav>
  );
}

export default Sidebar;