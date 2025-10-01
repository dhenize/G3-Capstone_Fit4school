import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import circleUser from '../../assets/icons/circle-user.svg';
import dashIcon from '../../assets/icons/dash-icon.png';
import orderIcon from '../../assets/icons/order-icon.png';
import uniIcon from '../../assets/icons/uni-icon.png';
import payIcon from '../../assets/icons/pay-icon.png';
import archvIcon from '../../assets/icons/archv-icon.png';
import accntIcon from '../../assets/icons/accnt-icon.png';
import signoutIcon from '../../assets/icons/signout-icon.png';

const ADashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <div className={`bg-green-500 text-white flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-22'
      }`}>
        {/* Menu Icon */}
        <div className={`flex items-center p-1 transition-all ${ isSidebarOpen ? 'justify-end' : 'justify-center'}`}
>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-blue-600 transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
          </button>
        </div>

        {/* Logo and User Icon */}
        <div className="p-3 mx-auto">

          <div className="flex items-center mt-1 mb-8 mx-4 gap-2">
            <img src="logo.png" alt="FIT4SCHOOL Logo" className="w-9 h-9 flex-shrink-0"/>
            {isSidebarOpen &&<h2 className="text-xl font-bold">FIT4SCHOOL</h2>}
          </div>

          <div className="flex items-center gap-2 px-4 mb-3">
            <img src={circleUser} alt="UserDefault Logo" className="w-7 h-7 flex-shrink-0" />
            {isSidebarOpen && (
            <div>
              <p className="text-m font-semibold">Joanna Cruz</p>
              <p className="text-xs">Admin</p>
            </div>)}
          </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8 p-2">

          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'dashboard' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Dashboard" : ""}
          >
            <img src={dashIcon} alt="dashIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Dashboard</p>}
          </button>
          
          {/* Orders */}
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'orders' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Orders" : ""}
          >
            <img src={orderIcon} alt="orderIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Orders</p>}
            
          </button>
          
          {/* Uniforms */}
          <button
            onClick={() => setActiveTab('uniforms')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'uniforms' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Uniforms" : ""}
          >
            <img src={uniIcon} alt="uniIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Uniforms</p>}
            
          </button>
          
          {/* Payments */}
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'payments' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Payments" : ""}
          >
            <img src={payIcon} alt="payIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Payments</p>}
            
          </button>

          {/* Archived */}
          <button
            onClick={() => setActiveTab('archived')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'archived' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Archived" : ""}
          >
            <img src={archvIcon} alt="archvIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Archived</p>}
            
          </button>

          {/* Accounts */}
          <button
            onClick={() => setActiveTab('accounts')}
            className={`w-full flex items-center p-2 rounded-xl transition ${
              activeTab === 'accounts' ? 'bg-blue-500' : 'hover:bg-blue-600'
            } ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
            title={!isSidebarOpen ? "Accounts" : ""}
          >
            <img src={accntIcon} alt="accntIcon" className="w-4 h-4 flex-shrink-0"/>
            {isSidebarOpen && <p className="ml-3 text-sm">Accounts</p>}
            
          </button>
        </nav>

        {/* Sign Out Button */}
      <div className="mt-9 p-2">
        <button 
          onClick={() => navigate('/')}
          className={`w-full flex items-center p-2 rounded-lg hover:underline transition ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'}`}
          title={!isSidebarOpen ? "Signout" : ""}
        >
          <img src={signoutIcon} alt="signoutIcon" className="w-4 h-4 flex-shrink-0"/>
          {isSidebarOpen && <p className="ml-3 text-sm">Sign out</p>}
        </button>
      </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">
          {activeTab === 'dashboard' && 'Dashboard'}
          {activeTab === 'orders' && 'Orders'}
          {activeTab === 'uniforms' && 'Uniforms'}
          {activeTab === 'payments' && 'Payments'}
          {activeTab === 'archived' && 'Archived'}
          {activeTab === 'accounts' && 'Accounts'}
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'dashboard' && (
            <p>Welcome to the admin dashboard! Your overview goes here.</p>
          )}
          {activeTab === 'orders' && (
            <p>Orders management goes here.</p>
          )}
          {activeTab === 'uniforms' && (
            <p>Uniform management go here.</p>
          )}
          {activeTab === 'payments' && (
            <p>Payments go here.</p>
          )}
          {activeTab === 'archived' && (
            <p>Archived contents go here.</p>
          )}
          {activeTab === 'accounts' && (
            <p>All user accounts can be viewed here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ADashboard; 