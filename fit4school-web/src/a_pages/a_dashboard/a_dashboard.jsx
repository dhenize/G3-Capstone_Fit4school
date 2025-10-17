import React, { useState, useEffect } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';
import packageIcon from '../../assets/icons/package.png';
import hourGlass from '../../assets/icons/hourglass.png';
import missedIcon from '../../assets/icons/missed.png';
import checkIcon from '../../assets/icons/check.png';
import customerIcon from '../../assets/icons/customer.png';
import calendarGIcon from '../../assets/icons/calendar-g.png';
import clockGIcon from '../../assets/icons/clock-g.png';

const ADashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState('current'); // 'current', 'queue', 'recent'
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'New uniform designs available for Pre-school!', date: '2025-08-17', author: 'Admin' },
    { id: 2, text: 'School closure on August 25, 2025 for Independence Day', date: '2025-08-15', author: 'Admin' },
  ]);

  // Mock data for current customer's orders
  const currentCustomer = {
    name: 'Maria Santos',
    queueNo: 24,
    totalOrders: 3,
    orders: [
      { orderId: '#00123', item: 'B Uniform (Pr_ScSh) M', size: 'M', qty: 3, status: 'serving' },
      { orderId: '#00124', item: 'PE Uniform (Jr_High) L', size: 'L', qty: 2, status: 'pending' },
      { orderId: '#00125', item: 'School Shoes Size 8', size: '8', qty: 1, status: 'pending' },
    ]
  };

  // Mock queue list
  const queueList = [
    { queueNo: 25, name: 'Juan Dela Cruz', orders: 2, waitTime: '5 min' },
    { queueNo: 26, name: 'Anna Reyes', orders: 1, waitTime: '10 min' },
    { queueNo: 27, name: 'Pedro Garcia', orders: 4, waitTime: '15 min' },
    { queueNo: 28, name: 'Lisa Fernandez', orders: 2, waitTime: '20 min' },
  ];

  // Mock recent activity
  const recentActivity = [
    { queueNo: 23, name: 'Carlos Miguel', action: 'Completed', time: '2 min ago', status: 'success' },
    { queueNo: 22, name: 'Sofia Torres', action: 'Completed', time: '5 min ago', status: 'success' },
    { queueNo: 21, name: 'Roberto Cruz', action: 'Missed', time: '8 min ago', status: 'missed' },
    { queueNo: 20, name: 'Elena Santos', action: 'Completed', time: '12 min ago', status: 'success' },
  ];

  useEffect(() => {
    document.title = "Admin Dashboard - Fit4School";
    
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

  const handlePostAnnouncement = () => {
    if (announcement.trim()) {
      const newAnnouncement = {
        id: announcements.length + 1,
        text: announcement,
        date: new Date().toISOString().split('T')[0],
        author: 'Admin'
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncement('');
      alert('Announcement posted successfully!');
    }
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ATopbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title="Dashboard" 
        />
        
        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          
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
              <div className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:shadow-md transition cursor-pointer">
                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  📊 Aug 18 - Aug 30, 2025
                </p>
              </div>
              <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:bg-gray-300 transition">
                <p className="text-xs sm:text-sm font-medium">➕ New Item</p>
              </button>
              <button className="bg-white rounded-lg shadow px-3 sm:px-4 py-2 hover:bg-gray-300 transition">
                <p className="text-xs sm:text-sm font-medium">📋 Audit Log</p>
              </button>
            </div>
          </div>
          
          {/* Top Stats Widgets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6">
            
            {/* Total Orders */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-32 sm:h-36 md:h-40 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold">Total Orders</h4>
                <img
                  src={packageIcon}
                  alt="Package Icon"
                  className="w-6 h-6 opacity-80"
                />
              </div>
              <p className="text-2xl text-blue-500 sm:text-3xl md:text-4xl font-bold">1,050</p>
              <p className="text-xs text-gray-500 opacity-80 mt-1">↑ 12% from last week</p>
            </div>
            
            {/* Customers */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-32 sm:h-36 md:h-40 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold">Customers</h4>
                <img
                  src={customerIcon}
                  alt="Customer Icon"
                  className="w-6 h-6 opacity-80"
                />
              </div>
              <p className="text-2xl text-blue-500 sm:text-3xl md:text-4xl font-bold">950</p>
              <p className="text-xs text-gray-500 opacity-80 mt-1">↑ 8% from last week</p>
            </div>
            
            {/* Completed */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-32 sm:h-36 md:h-40 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold">Completed</h4>
                <img
                  src={checkIcon}
                  alt="Check Icon"
                  className="w-6 h-6 opacity-80"
                />
              </div>
              <p className="text-2xl text-blue-500 sm:text-3xl md:text-4xl font-bold">580</p>
              <p className="text-xs text-gray-500 opacity-80 mt-1">55% completion rate</p>
            </div>
            
            {/* Pending */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-32 sm:h-36 md:h-40 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold">Pending</h4>
                <img
                  src={hourGlass}
                  alt="Hourglass Icon"
                  className="w-6 h-6 opacity-80"
                />
              </div>
              <p className="text-2xl text-green-500 sm:text-3xl md:text-4xl font-bold">456</p>
              <p className="text-xs text-gray-500 opacity-80 mt-1">43% of total orders</p>
            </div>
            
            {/* Missed */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-32 sm:h-36 md:h-40 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold">Missed</h4>
                <img
                  src={missedIcon}
                  alt="Missed Icon"
                  className="w-6 h-6 opacity-80"
                />
              </div>
              <p className="text-2xl text-red-500 sm:text-3xl md:text-4xl font-bold">46</p>
              <p className="text-xs text-gray-500 opacity-80 mt-1">4% of total orders</p>
            </div>
          </div>
          
          {/* Middle Section - Doughnut Chart & Enhanced Now Serving */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Doughnut Chart - Order Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl transition">
              <h4 className="text-sm md:text-base font-bold text-gray-800 mb-4">Grade Level Order Distribution</h4>
              <div className="flex flex-col md:flex-row items-center justify-around">
                {/* Doughnut Chart */}
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="167.55 83.78" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="50.27 201.06" strokeDashoffset="-167.55" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="32.67 218.66" strokeDashoffset="-217.82" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-gray-800">1,050</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex flex-col gap-3 mt-4 md:mt-0">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-700">Junior High - 136 (13%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Primary - 210 (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Pre-school - 704 (67%)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Now Serving Widget */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              {/* Tab Navigation */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveQueueTab('current')}
                  className={`flex-1 py-3 px-4 text-sm rounded-tl-lg font-semibold transition ${
                    activeQueueTab === 'current'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Now Serving
                </button>
                <button
                  onClick={() => setActiveQueueTab('queue')}
                  className={`flex-1 py-3 px-4 text-sm font-semibold transition ${
                    activeQueueTab === 'queue'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Queue List ({queueList.length})
                </button>
                <button
                  onClick={() => setActiveQueueTab('recent')}
                  className={`flex-1 py-3 px-4 text-sm rounded-tr-lg font-semibold transition ${
                    activeQueueTab === 'recent'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Recent
                </button>
              </div>

              <div className="p-4 md:p-6">
                {/* Current Customer Tab */}
                {activeQueueTab === 'current' && (
                  <div>
                    {/* Customer Info & Queue Number */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                      <div>
                        <h5 className="text-lg font-bold text-gray-800">{currentCustomer.name}</h5>
                        <p className="text-xs text-gray-500">Queue #{currentCustomer.queueNo} • {currentCustomer.totalOrders} orders</p>
                      </div>
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">{currentCustomer.queueNo}</span>
                      </div>
                    </div>

                    {/* Customer's All Orders */}
                    <div className="mb-4">
                      <h6 className="text-sm font-semibold text-gray-700 mb-3">Customer Orders:</h6>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {currentCustomer.orders.map((order, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border-2 ${
                              order.status === 'serving'
                                ? 'border-green-400 bg-green-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-700">{order.orderId}</span>
                              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                order.status === 'serving'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-yellow-400 text-gray-800'
                              }`}>
                                {order.status === 'serving' ? '🔔 NOW SERVING' : '⏳ Pending'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 font-medium">{order.item}</p>
                            <div className="flex gap-4 mt-1 text-xs text-gray-600">
                              <span>Size: {order.size}</span>
                              <span>Qty: {order.qty}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition text-sm font-bold">
                        ✓ Complete
                      </button>
                      <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-sm font-bold">
                        📞 Call
                      </button>
                      <button className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition text-sm font-bold">
                        ✕ Missed
                      </button>
                    </div>
                    <button className="w-full mt-2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition text-sm font-bold">
                      ⏭️ Next Customer
                    </button>
                  </div>
                )}

                {/* Queue List Tab */}
                {activeQueueTab === 'queue' && (
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Queue:</h6>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {queueList.map((customer, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{customer.queueNo}</span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{customer.name}</p>
                                <p className="text-xs text-gray-500">{customer.orders} orders • Est. wait: {customer.waitTime}</p>
                              </div>
                            </div>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                              Call Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Activity Tab */}
                {activeQueueTab === 'recent' && (
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity:</h6>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {recentActivity.map((activity, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
                                activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                <span className="text-lg">{activity.status === 'success' ? '✅' : '❌'}</span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">Queue #{activity.queueNo} - {activity.name}</p>
                                <p className="text-xs text-gray-500">{activity.action} • {activity.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Sales Chart & Enhanced Announcement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Sales Chart */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm md:text-base font-bold text-gray-800">Weekly Sales</h4>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-semibold">+ 7 this week</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-semibold">↑ 15%</span>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-around h-48 gap-2 border-b border-l border-gray-200 pb-2 pl-2">
                {[
                  { day: 'M', height: 40, value: '₱5.2k' },
                  { day: 'T', height: 30, value: '₱3.8k' },
                  { day: 'W', height: 70, value: '₱8.5k' },
                  { day: 'Th', height: 50, value: '₱6.2k' },
                  { day: 'F', height: 85, value: '₱10.1k' },
                  { day: 'S', height: 75, value: '₱9.2k' },
                  { day: 'Su', height: 45, value: '₱5.8k' },
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 flex-1 group relative">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition cursor-pointer"
                      style={{ height: `${bar.height}%` }}
                    >
                      {/* Tooltip */}
                      <div className="hidden group-hover:block absolute bottom-full mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        {bar.value}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-semibold">{bar.day}</span>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="flex justify-between mt-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Total This Week</p>
                  <p className="text-lg font-bold text-gray-800">₱48,800</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Daily Average</p>
                  <p className="text-lg font-bold text-gray-800">₱6,971</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Announcement Widget */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h4 className="text-sm md:text-base font-bold text-gray-800">📢 Announcements</h4>
                <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition text-xs font-semibold flex items-center gap-1">
                  <span>➕</span> New
                </button>
              </div>

              <div className="p-4">
                {/* Post New Announcement */}
                <div className="mb-4">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                    placeholder="Type your announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    maxLength={500}
                  ></textarea>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{announcement.length}/500 characters</span>
                    <button
                      onClick={handlePostAnnouncement}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={!announcement.trim()}
                    >
                      📤 Post
                    </button>
                  </div>
                </div>

                {/* Recent Announcements */}
                <div>
                  <h6 className="text-xs font-semibold text-gray-600 mb-2">Recent Announcements:</h6>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {announcements.map((item) => (
                      <div key={item.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm text-gray-800 flex-1">{item.text}</p>
                          <button
                            onClick={() => handleDeleteAnnouncement(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2 text-xs"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                          <span>👤 {item.author}</span>
                          <span>📅 {item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ADashboard;