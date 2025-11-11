import React, { useEffect, useState } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';
import searchIcon from '../../assets/icons/search.png';
import exportIcon from '../../assets/icons/export-icon.png';
import filterIcon from '../../assets/icons/filter-icon.png';

const AOrders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Mock data - Replace this with actual database fetch
  const [orders, setOrders] = useState([
    {
      orderId: '#00123',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'On Hold',
    },
    {
      orderId: '#00124',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'Pending',
    },
    {
      orderId: '#00125',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'Confirmed',
    },
    {
      orderId: '#00126',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'In Production',
    },
    {
      orderId: '#00127',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'To Claim',
    },
    {
      orderId: '#00128',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'To Return',
    },
    {
      orderId: '#00129',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'Completed',
    },
    {
      orderId: '#00130',
      studentId: '12345678',
      orderedTime: 'Aug 3 2025',
      arrivalTime: 'Aug 15 2025',
      appointmentTime: 'Aug 15 2025 | 11:00 am',
      quantity: 2,
      status: 'Cancelled',
    },
  ]);

  useEffect(() => {
    document.title = "Admin | Orders - Fit4School";
    
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

  // TODO: Replace with actual API call
  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch('/api/orders');
  //     const data = await response.json();
  //     setOrders(data);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Pending': 'bg-orange-100 text-orange-800 border-orange-300',
      'Confirmed': 'bg-blue-100 text-blue-800 border-blue-300',
      'In Production': 'bg-purple-100 text-purple-800 border-purple-300',
      'To Claim': 'bg-green-100 text-green-800 border-green-300',
      'To Return': 'bg-pink-100 text-pink-800 border-pink-300',
      'Completed': 'bg-teal-100 text-teal-800 border-teal-300',
      'Cancelled': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.studentId.includes(searchText);
    
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Sorting logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(sortedOrders.map((order) => order.orderId));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle individual select
  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Export to CSV
  const handleExport = () => {
    const csvContent = [
      ['Order ID', 'Student ID', 'Ordered Time', 'Arrival Time', 'Appointment Time', 'Quantity', 'Status'],
      ...sortedOrders.map(order => [
        order.orderId,
        order.studentId,
        order.orderedTime,
        order.arrivalTime,
        order.appointmentTime,
        order.quantity,
        order.status,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const statuses = ['All', 'On Hold', 'Pending', 'Confirmed', 'In Production', 'To Claim', 'To Return', 'Completed', 'Cancelled'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <ATopbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          title="Orders"
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Orders Management</h1>
          
          {/* Actions Bar */}
          <div className="bg-white rounded-lg shadow mb-4 p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              {/* Left: Filter & Export */}
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                    <img src={filterIcon} alt="Filter" className="w-5 h-5" />
                    <span className="font-medium">Filter</span>
                  </button>
                </div>
                
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  <img src={exportIcon} alt="Export" className="w-5 h-5" />
                  <span className="font-medium">Export</span>
                </button>

                {selectedOrders.length > 0 && (
                  <span className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                    {selectedOrders.length} selected
                  </span>
                )}
              </div>

              {/* Right: Search */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    filterStatus === status
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-cyan-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-blue-500 transition"
                      onClick={() => handleSort('orderId')}
                    >
                      <div className="flex items-center gap-1">
                        Order ID
                        {sortConfig.key === 'orderId' && (
                          <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-blue-500 transition"
                      onClick={() => handleSort('studentId')}
                    >
                      <div className="flex items-center gap-1">
                        Student ID
                        {sortConfig.key === 'studentId' && (
                          <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-blue-500 transition"
                      onClick={() => handleSort('orderedTime')}
                    >
                      <div className="flex items-center gap-1">
                        Ordered Time
                        {sortConfig.key === 'orderedTime' && (
                          <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Arrival Time</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Appointment Time</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-blue-500 transition"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sortConfig.key === 'status' && (
                          <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order, index) => (
                      <tr 
                        key={order.orderId}
                        className={`hover:bg-gray-50 transition ${
                          selectedOrders.includes(order.orderId) ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.orderId)}
                            onChange={() => handleSelectOrder(order.orderId)}
                            className="w-4 h-4 rounded cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">{order.orderId}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.studentId}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.orderedTime}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.arrivalTime}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.appointmentTime}</td>
                        <td className="px-4 py-3 text-sm text-center font-semibold">{order.quantity}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {sortedOrders.length} of {orders.length} orders
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-400 text-white rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AOrders;