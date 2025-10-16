import React, { useState, useEffect } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';

const ADashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin | Dashboard - Fit4School";
    
    // Auto-open sidebar on desktop, closed on mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ATopbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title="Dashboard" 
        />
        
        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          
          {/* Top Info Bar - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            
            {/* Date and Time */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">
                Today is Monday, September 29, 2025
              </h3>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">
                10:00:00 AM
              </h3>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 sm:ml-auto">
              <div className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:shadow-md transition">
                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Sept. 22, 2025 - Sept. 29, 2025
                </p>
              </div>
              <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:shadow-md transition">
                <p className="text-xs sm:text-sm font-medium">New User</p>
              </button>
              <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:shadow-md transition">
                <p className="text-xs sm:text-sm font-medium">Audit Log</p>
              </button>
            </div>
          </div>
          
          {/* Analytics Widgets - 5 boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4 h-32 sm:h-36 md:h-40 hover:shadow-lg transition">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Total Orders</h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">1,234</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 h-32 sm:h-36 md:h-40 hover:shadow-lg transition">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Customers</h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">950</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 h-32 sm:h-36 md:h-40 hover:shadow-lg transition">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Completed</h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">879</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 h-32 sm:h-36 md:h-40 hover:shadow-lg transition">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Pending</h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">89</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 h-32 sm:h-36 md:h-40 hover:shadow-lg transition">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Missed</h4>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">45</p>
            </div>
          </div>
          
          {/* Middle Section - 2 boxes side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6 h-48 sm:h-56 md:h-64 hover:shadow-lg transition">
              <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3">Recent Activity</h4>
              <p className="text-xs sm:text-sm text-gray-600">Activity content here...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 md:p-6 h-48 sm:h-56 md:h-64 hover:shadow-lg transition">
              <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3">Quick Stats</h4>
              <p className="text-xs sm:text-sm text-gray-600">Stats content here...</p>
            </div>
          </div>
          
          {/* Bottom Section - 2 boxes side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6 h-48 sm:h-56 md:h-64 hover:shadow-lg transition">
              <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3">Sales Chart</h4>
              <p className="text-xs sm:text-sm text-gray-600">Chart will go here...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 md:p-6 h-48 sm:h-56 md:h-64 hover:shadow-lg transition">
              <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3">Order Status</h4>
              <p className="text-xs sm:text-sm text-gray-600">Status breakdown here...</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ADashboard;