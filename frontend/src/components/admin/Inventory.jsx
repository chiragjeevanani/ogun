import React, { useState } from 'react';
import { adminUi, statusBadge } from './adminStyles';

const Inventory = () => {
  const initialData = [
    { id: 1, name: 'Induction Cooktop', category: 'Cooking', price: 'Rs 12,499', quantity: 45 },
    { id: 2, name: 'Washing Machine', category: 'Laundry', price: 'Rs 34,999', quantity: 8 },
    { id: 3, name: 'Refrigerator', category: 'Cooling', price: 'Rs 48,500', quantity: 22 },
    { id: 4, name: 'Mixer Grinder', category: 'Kitchen', price: 'Rs 3,199', quantity: 65 },
    { id: 5, name: 'Water Purifier', category: 'Water', price: 'Rs 15,800', quantity: 5 },
    { id: 6, name: 'Microwave Oven', category: 'Cooking', price: 'Rs 8,999', quantity: 3 },
  ];

  const categories = ['All', 'Cooking', 'Laundry', 'Cooling', 'Kitchen', 'Water'];
  const [products, setProducts] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cooking',
    price: '',
    quantity: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity) => {
    if (quantity < 10) {
      return 'Low Stock';
    }
    return 'In Stock';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      alert('Please fill all fields');
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      price: `Rs ${parseInt(formData.price, 10).toLocaleString()}`,
      quantity: parseInt(formData.quantity, 10),
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', category: 'Cooking', price: '', quantity: '' });
    setShowModal(false);
    alert('Product added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit product ${id} - Feature coming soon!`);
  };

  const stats = [
    { title: 'Total Products', value: products.length },
    { title: 'In Stock', value: products.filter((product) => product.quantity >= 10).length },
    { title: 'Low Stock', value: products.filter((product) => product.quantity < 10).length },
    { title: 'Total Value', value: 'Rs 1.27Cr' },
  ];

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Inventory</h1>
          <p className={adminUi.pageDescription}>Manage your kitchen appliance stock.</p>
        </div>
        <button onClick={() => setShowModal(true)} className={adminUi.primaryButton}>
          Add Product
        </button>
      </div>

      {showModal && (
        <div className={adminUi.modalOverlay}>
          <div className={adminUi.modal}>
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Add Product</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-500 transition hover:text-gray-700"
              >
                x
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Air Fryer"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={adminUi.select}
                >
                  {categories.filter((category) => category !== 'All').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 5999"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  className={adminUi.input}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className={`flex-1 ${adminUi.secondaryButton} py-2`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 ${adminUi.primaryButton}`}>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={adminUi.input}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={adminUi.select}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.title}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Product Inventory ({filteredProducts.length})</h2>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={adminUi.tableHeader}>
                  <tr>
                    <th className={adminUi.th}>Product</th>
                    <th className={adminUi.th}>Category</th>
                    <th className={adminUi.th}>Price</th>
                    <th className={adminUi.th}>Stock</th>
                    <th className={adminUi.th}>Status</th>
                    <th className={adminUi.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.quantity);
                    return (
                      <tr key={product.id} className={adminUi.tableRow}>
                        <td className={`${adminUi.td} font-medium text-gray-900`}>{product.name}</td>
                        <td className={adminUi.td}>{product.category}</td>
                        <td className={`${adminUi.td} text-gray-800`}>{product.price}</td>
                        <td className={adminUi.td}>{product.quantity}</td>
                        <td className={adminUi.td}>
                          <span className={statusBadge(stockStatus)}>{stockStatus}</span>
                        </td>
                        <td className={adminUi.td}>
                          <div className="flex items-center gap-4">
                            <button onClick={() => handleEdit(product.id)} className={adminUi.textButton}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="text-sm text-red-600 transition hover:underline">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{filteredProducts.length}</span> of{' '}
                <span className="font-medium text-gray-700">{products.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button className={adminUi.secondaryButton}>Previous</button>
                <button className={adminUi.secondaryButton}>Next</button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-400">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
