import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-1 bg-black text-white p-4">
          <div className="flex items-center justify-center h-16 flex-shrink-0">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          <nav className="mt-8 flex-1 space-y-2">
            <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <span>Orders</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <span>Products</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors mt-8">
              <span>Logout</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="p-4">
          {/* Mobile sidebar toggle button */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
              <div className="fixed inset-y-0 left-0 w-64 bg-black text-white p-4 transform transition-transform">
                <div className="flex items-center justify-between h-16">
                  <h2 className="text-xl font-bold">Admin Panel</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="mt-8 space-y-2">
                  <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
                    <span>Orders</span>
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
                    <span>Products</span>
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-white bg-black/20 rounded-lg hover:bg-black/30 transition-colors mt-8">
                    <span>Logout</span>
                  </a>
                </nav>
              </div>
            </div>
          )}

          {/* Page content */}
          <div className="p-6">
           <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;