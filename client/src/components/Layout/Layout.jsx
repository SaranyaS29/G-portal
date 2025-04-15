// components/Layout.jsx
import React from 'react';
import Sidebar from '../SideBar/SideBar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4 ml-16 sm:ml-64">
        {children}
      </div>
    </div>
  );
};

export default Layout;
