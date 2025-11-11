import React, { useEffect, useState } from 'react';
import AcSidebar from '../../components/ac_sidebar/ac_sidebar.jsx';
import AcTopbar from '../../components/ac_topbar/ac_topbar.jsx';
import calendarGIcon from '../../assets/icons/calendar-g.png';
import clockGIcon from '../../assets/icons/clock-g.png';

const AcDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Mock payment queue data - Replace with API call
  const [paymentQueue, setPaymentQueue] = useState([
    {
      orderId: '#00123',
      fullName: 'Mary Dela Cruz',
      itemName: 'B Unifrm (Pr_Schl M)',
      quantity: 1,
      price: '₱500.00',
      status: 'confirmed',
      paymentType: 'cash', // 'cash', 'bank', 'online'
    },
    {
      orderId: '#00123',
      fullName: 'Mary Dela Cruz',
      itemName: 'B Unifrm (Pr_Schl M)',
      quantity: 1,
      price: '₱500.00',
      status: 'confirmed',
      paymentType: 'bank',
    },
    {
      orderId: '#00123',
      fullName: 'Mary Dela Cruz',
      itemName: 'B Unifrm (Pr_Schl M)',
      quantity: 1,
      price: '₱500.00',
      status: 'pending',
      paymentType: 'online',
    },
  ]);

  // Mock stats data
  const [stats, setStats] = useState({
    confirmedPayments: 102,
    pendingPayments: 50,
    paidOnsite: 32,
    paidOnline: 70,
    onlinePercentage: 69,
    onsitePercentage: 31,
  });

  useEffect(() => {
    document.title = "Accountant | Dashboard - Fit4School";
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // TODO: Fetch data from database
  // useEffect(() => {
  //   fetchPaymentStats();
  //   fetchPaymentQueue();
  // }, []);

  // const fetchPaymentStats = async () => {
  //   try {
  //     const response = await fetch('/api/accountant/payment-stats');
  //     const data = await response.json();
  //     setStats(data);
  //   } catch (error) {
  //     console.error('Error fetching stats:', error);
  //   }
  // };

  // const fetchPaymentQueue = async () => {
  //   try {
  //     const response = await fetch('/api/accountant/payment-queue');
  //     const data = await response.json();
  //     setPaymentQueue(data);
  //   } catch (error) {
  //     console.error('Error fetching queue:', error);
  //   }
  // };

  // Handle payment verification
  const handleVerifyPayment = (orderId, paymentType) => {
    if (window.confirm(`Verify payment for order ${orderId} via ${paymentType}?`)) {
      // TODO: API call to verify payment
      alert(`Payment verified for ${orderId}`);
      
      // Update local state
      setPaymentQueue(paymentQueue.map(payment => 
        payment.orderId === orderId 
          ? { ...payment, status: 'confirmed' }
          : payment
      ));
    }
  };

  // Handle payment rejection
  const handleRejectPayment = (orderId) => {
    if (window.confirm(`Reject payment for order ${orderId}?`)) {
      // TODO: API call to reject payment
      alert(`Payment rejected for ${orderId}`);
      
      // Remove from queue
      setPaymentQueue(paymentQueue.filter(payment => payment.orderId !== orderId));
    }
  };

  // Filter payment queue based on search
  const filteredQueue = paymentQueue.filter((payment) =>
    payment.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
    payment.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Get status badge style
  const getStatusStyle = (status) => {
    return status === 'confirmed'
      ? 'bg-green-500 text-white'
      : 'bg-gray-300 text-gray-700';
  };

  // Get payment type badge
  const getPaymentTypeBadge = (type) => {
    const badges = {
      cash: { bg: 'bg-green-100', text: 'text-green-700', label: '💵 Cash' },
      bank: { bg: 'bg-blue-100', text: 'text-blue-700', label: '🏦 Bank' },
      online: { bg: 'bg-purple-100', text: 'text-purple-700', label: '💳 Online' },
    };
    return badges[type] || badges.cash;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AcSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <AcTopbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          title="Dashboard"
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

                   {/* Top Info Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
                          <img
                            src={calendarGIcon}
                            alt="Calendar Green"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                          Today is Monday, August 18, 2025
                        </h3>
                        <h3 className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
                          <img
                            src={clockGIcon}
                            alt="Clock Green"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                          10:00:00 AM
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-3 sm:ml-auto">
                        <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:bg-gray-300 transition cursor-pointer">
                          <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                            📊 Aug 18 - Aug 30, 2025
                          </p>
                        </button>
                        <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:bg-gray-300 transition">
                          <p className="text-xs sm:text-sm font-medium">📋 Audit Log</p>
                        </button>
                      </div>
                    </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6">
            {/* Confirmed Payments */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
              <h3 className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Confirmed Payments</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500">{stats.confirmedPayments}</p>
            </div>

            {/* Pending Payments */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
              <h3 className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Pending Payments</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500">{stats.pendingPayments}</p>
            </div>

            {/* Paid On-site */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
              <h3 className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Paid On-site</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500">{stats.paidOnsite}</p>
            </div>

            {/* Paid Online */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
              <h3 className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Paid Online</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500">{stats.paidOnline}</p>
            </div>

            {/* Pie Chart - Online vs On-site */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between h-full">
                {/* Legend */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-gray-700 font-medium">Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-700 font-medium">On-site</span>
                  </div>
                </div>
                
                {/* Pie Chart */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Online - Cyan */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="20"
                      strokeDasharray={`${stats.onlinePercentage * 2.51} ${(100 - stats.onlinePercentage) * 2.51}`}
                      strokeDashoffset="0"
                    />
                    {/* On-site - Green */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="20"
                      strokeDasharray={`${stats.onsitePercentage * 2.51} ${(100 - stats.onsitePercentage) * 2.51}`}
                      strokeDashoffset={`-${stats.onlinePercentage * 2.51}`}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Queue Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">PAYMENT QUEUE</h2>
              
              {/* Search Bar */}
              <div className="relative w-48 sm:w-64">
                <input
                  type="text"
                  placeholder="search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Full Name</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Item Name</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Price</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Payment Type</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQueue.length > 0 ? (
                    filteredQueue.map((payment, index) => {
                      const paymentBadge = getPaymentTypeBadge(payment.paymentType);
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-xs sm:text-sm font-semibold text-gray-800">
                            {payment.orderId}
                          </td>
                          <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                            {payment.fullName}
                          </td>
                          <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                            {payment.itemName}
                          </td>
                          <td className="px-4 py-3 text-xs sm:text-sm text-center font-semibold">
                            {payment.quantity}
                          </td>
                          <td className="px-4 py-3 text-xs sm:text-sm font-semibold text-gray-800">
                            {payment.price}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${paymentBadge.bg} ${paymentBadge.text}`}>
                              {paymentBadge.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(payment.status)}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {payment.status === 'pending' ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleVerifyPayment(payment.orderId, payment.paymentType)}
                                  className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition"
                                >
                                  ✓ Verify
                                </button>
                                <button
                                  onClick={() => handleRejectPayment(payment.orderId)}
                                  className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition"
                                >
                                  ✕ Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">Verified</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm">
                        No payments in queue
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AcDashboard;