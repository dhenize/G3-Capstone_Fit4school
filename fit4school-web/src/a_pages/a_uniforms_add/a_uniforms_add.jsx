import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ASidebar from '../../components/a_sidebar/a_sidebar.jsx';
import ATopbar from '../../components/a_topbar/a_topbar.jsx';

const AUniformsAdd = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    uniform_type: '',
    size: '',
    measurements: { Length: '', Width: '', Shoulder: '', Sleeve: '' },
    stock_level: '',
    price: '',
    image: null,
    image_preview: '',
  });

  const abbreviations = { Polo: 'P', Pants: 'Pa', Blouse: 'B', Skirt: 'S' };
  const levels = { Elementary: 'Elem', 'High School': 'HS' };
  const [schoolLevel, setSchoolLevel] = useState('HS');

  const itemCode =
    formData.uniform_type && formData.size
      ? `${abbreviations[formData.uniform_type]} Unfrm (${schoolLevel}) ${formData.size}`
      : '';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        image_preview: URL.createObjectURL(file),
      });
    }
  };

  const handleMeasurementChange = (key, value) => {
    setFormData({
      ...formData,
      measurements: { ...formData.measurements, [key]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate new item ID
    const newItem = {
      item_id: Date.now(), // Simple ID generation
      item_code: itemCode,
      ...formData,
      price: parseFloat(formData.price),
      stock_level: parseInt(formData.stock_level),
    };

    console.log('Uniform added:', newItem);
    alert('Uniform saved successfully!');
    navigate('/a_uniforms');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/a_uniforms');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <ASidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <ATopbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          title="Add Uniform"
        />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add New Uniform</h1>
              <p className="text-gray-600 mt-2">Add a new uniform item to your inventory</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
              
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Uniform Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uniform Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.uniform_type}
                      onChange={(e) => setFormData({ ...formData, uniform_type: e.target.value })}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Polo">Polo Shirt</option>
                      <option value="Pants">Pants</option>
                      <option value="Blouse">Blouse</option>
                      <option value="Skirt">Skirt</option>
                    </select>
                  </div>

                  {/* School Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={schoolLevel}
                      onChange={(e) => setSchoolLevel(e.target.value)}
                      required
                    >
                      <option value="HS">High School</option>
                      <option value="Elem">Elementary</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., S, M, L, XL"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value.toUpperCase() })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Generated Item Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Generated Item Code
                    </label>
                    <input
                      value={itemCode}
                      readOnly
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600 focus:outline-none font-medium"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-generated based on type, level, and size
                    </p>
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Measurements (in centimeters)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.keys(formData.measurements).map((m) => (
                    <div key={m}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{m}</label>
                      <input
                        type="number"
                        placeholder={`${m} in cm`}
                        value={formData.measurements[m]}
                        onChange={(e) => handleMeasurementChange(m, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory & Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Inventory & Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stock_level}
                      onChange={(e) => setFormData({ ...formData, stock_level: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₱) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Uniform Image</h3>
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="uniform-image"
                      />
                      <label htmlFor="uniform-image" className="cursor-pointer">
                        <div className="text-gray-400 mb-3">
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Click to upload an image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                      </label>
                    </div>
                  </div>
                  
                  {formData.image_preview && (
                    <div className="flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                      <div className="w-48 h-48 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={formData.image_preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-md"
                >
                  Save Uniform Item
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AUniformsAdd;