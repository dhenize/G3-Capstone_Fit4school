import React, { useEffect } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';

const ADashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard - Fit4School";
  }, []);

  return (
    <div className="flex min-h-screen">
      <ASidebar /> 
      <div className="flex-1 flex flex-col bg-gray-100"><ATopbar />
      
      <div className="flex-1 bg-gray-100 p-4">

        <div className="flex items-center gap-6 mb-6">
          <h3 className="text-m font-bold mx-2">Today is Monday, September 29, 2025</h3>
          <h3 className="text-m font-bold">10:00:00 AM</h3>
          
          <div className="bg-white rounded-lg shadow h-10 w-64 ml-15">
            <p className="flex text-sm font-semibold items-center justify-center mt-2">Sept. 22, 2025 - Sept. 29, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow h-10 w-36">
            <p className="flex text-sm font-semibold items-center justify-center mt-2">New User</p>
          </div>

          <div className="bg-white rounded-lg shadow h-10 w-30">
            <p className="flex text-sm font-semibold items-center justify-center mt-2">Audit Log</p>
          </div>
        </div>
        
        <div className= "flex mx-auto gap-6 flex-wrap justify-center mb-6">
          <div className="bg-white rounded-lg shadow h-40 w-44"></div>
          <div className="bg-white rounded-lg shadow h-40 w-44"></div>
          <div className="bg-white rounded-lg shadow h-40 w-44"></div>
          <div className="bg-white rounded-lg shadow h-40 w-44"></div>
          <div className="bg-white rounded-lg shadow h-40 w-44"></div>
        </div>

        <div className= "flex mx-13 gap-6 flex-wrap">
          <div className="bg-white rounded-lg shadow h-40 w-92"></div>
          <div className="bg-white rounded-lg shadow h-40 w-xl"></div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default ADashboard;