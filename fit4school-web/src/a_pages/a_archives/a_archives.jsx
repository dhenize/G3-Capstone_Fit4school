import React, { useEffect, useState } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';

const AArchives = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin | Archives - Fit4School";

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
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Topbar */}
        <ATopbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          title="Archives"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Archives</h1>

          <div className="bg-white rounded-lg shadow p-6 sm:p-4 py-2 hover:shadow-md transition">
            <p>Welcome to the admin Archives!</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AArchives;
