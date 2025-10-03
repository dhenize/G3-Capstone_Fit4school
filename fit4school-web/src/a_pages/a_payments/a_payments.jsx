import React, { useEffect } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';

const APayments = () => {
  useEffect(() => {
    document.title = "Admin Payments - Fit4School";
  }, []);

  return (
    <div className="flex min-h-screen">
      <ASidebar />
      <div className="flex-1 flex flex-col bg-gray-100"><ATopbar />
      
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Payments</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p>Welcome to the admin payments!</p>
        </div>
      </div>
    </div>
</div>
  );
}

export default APayments;