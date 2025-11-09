import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SupSidebar from '../../components/sup_sidebar/sup_sidebar';

const SupAdAccountant = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Super Admin | Accountant - Fit4School";

    const handleResize = () => {
      // Sidebar stays open on desktop, collapses on mobile
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Initialize once
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SupSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Accountant Accounts</h1>

          <div className="bg-white rounded-lg shadow p-6 sm:p-4 py-2 hover:shadow-md transition">
            <p>Welcome to the accountant accounts!</p>
          </div>
        </main>
      </div>
    </div>
  );
};
export default SupAdAccountant;