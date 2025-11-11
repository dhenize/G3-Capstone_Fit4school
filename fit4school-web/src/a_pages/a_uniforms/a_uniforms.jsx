import React, { useEffect, useState } from 'react';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';
import { useNavigate } from 'react-router-dom';

const AUniforms = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  // Sample data with proper structure
  const [uniforms, setUniforms] = useState([
    {
      item_id: 1,
      item_code: 'P Unfrm (HS) M',
      uniform_type: 'Polo',
      stock_level: 30,
      price: 350.0,
      image_path: '/images/polo-hs.png',
      size: 'M',
      measurements: { Length: 26, Width: 20, Shoulder: 17, Sleeve: 9 }
    },
    {
      item_id: 2,
      item_code: 'B Unfrm (Elem) S',
      uniform_type: 'Blouse',
      stock_level: 20,
      price: 320.0,
      image_path: '/images/blouse-elem.png',
      size: 'S',
      measurements: { Length: 24, Width: 18, Shoulder: 16, Sleeve: 8 }
    },
    {
      item_id: 3,
      item_code: 'Pa Unfrm (HS) L',
      uniform_type: 'Pants',
      stock_level: 25,
      price: 400.0,
      image_path: '/images/pants-hs.png',
      size: 'L',
      measurements: { Length: 38, Width: 20, Shoulder: '-', Sleeve: '-' }
    },
    {
      item_id: 4,
      item_code: 'S Unfrm (Elem) M',
      uniform_type: 'Skirt',
      stock_level: 15,
      price: 280.0,
      image_path: '/images/skirt-elem.png',
      size: 'M',
      measurements: { Length: 24, Width: 20, Shoulder: '-', Sleeve: '-' }
    },
  ]);

  // Filter and search
  const filteredUniforms = uniforms.filter((u) => {
    const matchesSearch = u.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.uniform_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || u.uniform_type === filterType;
    return matchesSearch && matchesType;
  });

  // Start editing an item
  const startEdit = (item) => {
    setEditingItem(item.item_id);
    setEditForm({ ...item });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({});
  };

  // Save edited item
  const saveEdit = () => {
    setUniforms(uniforms.map(item => 
      item.item_id === editingItem ? { ...editForm } : item
    ));
    setEditingItem(null);
    setEditForm({});
  };

  // Delete item
  const deleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setUniforms(uniforms.filter(item => item.item_id !== itemId));
    }
  };

  // Handle form field changes
  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle measurement changes
  const handleMeasurementChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      measurements: { ...prev.measurements, [field]: value }
    }));
  };

  // Handle image upload
  const handleImageUpload = (e, itemId) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (editingItem === itemId) {
        setEditForm(prev => ({ ...prev, image_path: imageUrl }));
      } else {
        setUniforms(uniforms.map(item => 
          item.item_id === itemId ? { ...item, image_path: imageUrl } : item
        ));
      }
    }
  };

  useEffect(() => {
    document.title = 'Admin | Uniforms - Fit4School';
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <ATopbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          title="Uniforms"
        />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0 transition-all duration-300">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Uniforms</h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/a_uniforms_add')}
                className="bg-cyan-500 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md"
              >
                <span className="text-lg">+</span>
                <span>Add New Item</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{uniforms.length}</p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-lg sm:text-xl">👕</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-500 mt-1">
                    {uniforms.filter(u => u.stock_level < 20).length}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
                  <span className="text-red-600 text-lg sm:text-xl">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
                    {uniforms.filter(u => u.stock_level >= 20).length}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-lg sm:text-xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">4</p>
                </div>
                <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-lg sm:text-xl">🏷️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by item code or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full lg:w-48 border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Polo">Polo</option>
                <option value="Pants">Pants</option>
                <option value="Blouse">Blouse</option>
                <option value="Skirt">Skirt</option>
              </select>

              <button
                onClick={() => { setSearchTerm(''); setFilterType('All'); }}
                className="w-full lg:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Uniforms Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type & Size</th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Measurements</th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUniforms.map((item) => (
                    <tr key={item.item_id} className="hover:bg-gray-50 transition-colors">
                      {/* Item Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={editForm.image_path || '/images/placeholder-uniform.png'}
                                alt={editForm.item_code}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, item.item_id)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full text-xs">
                                ✏️
                              </div>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={editForm.item_code}
                                onChange={(e) => handleEditChange('item_code', e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full max-w-[120px] sm:max-w-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden border">
                              {item.image_path ? (
                                <img
                                  src={item.image_path}
                                  alt={item.item_code}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-blue-600 font-bold text-sm sm:text-lg">
                                  {item.uniform_type.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">{item.item_code}</div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Type & Size Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <div className="space-y-2">
                            <select
                              value={editForm.uniform_type}
                              onChange={(e) => handleEditChange('uniform_type', e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="Polo">Polo</option>
                              <option value="Pants">Pants</option>
                              <option value="Blouse">Blouse</option>
                              <option value="Skirt">Skirt</option>
                            </select>
                            <input
                              type="text"
                              value={editForm.size}
                              onChange={(e) => handleEditChange('size', e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-12 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Size"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              item.uniform_type === 'Polo' ? 'bg-blue-100 text-blue-800' :
                              item.uniform_type === 'Pants' ? 'bg-green-100 text-green-800' :
                              item.uniform_type === 'Blouse' ? 'bg-pink-100 text-pink-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {item.uniform_type}
                            </span>
                            <div className="text-xs sm:text-sm text-gray-600">Size: {item.size}</div>
                          </div>
                        )}
                      </td>

                      {/* Stock Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <input
                            type="number"
                            value={editForm.stock_level}
                            onChange={(e) => handleEditChange('stock_level', parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-16 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            min="0"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                              item.stock_level > 20 ? 'bg-green-500' :
                              item.stock_level > 10 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`font-semibold text-sm sm:text-base ${
                              item.stock_level > 20 ? 'text-green-600' :
                              item.stock_level > 10 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {item.stock_level}
                            </span>
                            <span className="text-gray-500 text-xs sm:text-sm">pcs</span>
                          </div>
                        )}
                      </td>

                      {/* Price Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1 text-sm">₱</span>
                            <input
                              type="number"
                              value={editForm.price}
                              onChange={(e) => handleEditChange('price', parseFloat(e.target.value))}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              step="0.01"
                              min="0"
                            />
                          </div>
                        ) : (
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">₱{item.price.toFixed(2)}</div>
                        )}
                      </td>

                      {/* Measurements Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <div className="space-y-1">
                            {Object.entries(editForm.measurements).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-1">
                                <span className="text-xs text-gray-600 w-12">{key}:</span>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleMeasurementChange(key, e.target.value)}
                                  className="border border-gray-300 rounded px-1 py-0.5 text-xs w-12 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="cm"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600 space-y-1">
                            {Object.entries(item.measurements)
                              .filter(([key, value]) => value !== '-')
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between gap-2">
                                  <span className="font-medium">{key}:</span>
                                  <span>{value}cm</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {editingItem === item.item_id ? (
                          <div className="flex gap-1 sm:gap-2">
                            <button
                              onClick={saveEdit}
                              className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1 sm:gap-2">
                            <button
                              onClick={() => startEdit(item)}
                              className="bg-cyan-500 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteItem(item.item_id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredUniforms.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">👕</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No uniforms found</h3>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">Try adjusting your search or add a new item</p>
                <button
                  onClick={() => navigate('/a_uniforms_add')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Add New Item
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-0">
                Showing <span className="font-semibold">{filteredUniforms.length}</span> of{' '}
                <span className="font-semibold">{uniforms.length}</span> items
              </div>
              
              <div className="flex gap-1 sm:gap-2">
                <button className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                  Previous
                </button>
                <button className="px-2 sm:px-4 py-1 sm:py-2 bg-cyan-500 text-white rounded-lg text-xs sm:text-sm font-medium">
                  1
                </button>
                <button className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                  2
                </button>
                <button className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AUniforms;