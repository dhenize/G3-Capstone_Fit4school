import React, { useEffect } from "react";
import AcSidebar from '../../components/ac_sidebar/ac_sidebar.jsx';
import AcTopbar from '../../components/ac_topbar/ac_topbar.jsx';

const AcArchives = () => {
  useEffect(() => {
    document.title = "Accountant Archives - Fit4School";
  }, []);

  return (
    <div className="flex min-h-screen">
      <AcSidebar />
      <div className="flex-1 flex flex-col bg-gray-100"><AcTopbar />
      
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Archives</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p>Welcome to the accountant archives!</p>
        </div>
      </div>
    </div>
</div>
  );
}

export default AcArchives;