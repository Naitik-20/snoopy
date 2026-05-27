import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Package, 
  Upload, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Search,
  Eye,
  Star,
  ShoppingCart,
  Loader,
  CheckCircle,
  AlertCircle,
  Settings,
  Grid
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'manage' | 'add'
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Product Creator Form State
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: 'Foods',
    price: '',
    originalPrice: '',
    description: '',
    composition: '',
    dosage: '',
    weightGroup: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [actionStatus, setActionStatus] = useState(null); // { type: 'success' | 'error', message }
  
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      if (data.status === 'success') {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragRef.current?.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dragRef.current?.classList.add('drag-over');
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove('drag-over');
  };

  const handleReset = () => {
    setForm({
      name: '',
      brand: '',
      category: 'Foods',
      price: '',
      originalPrice: '',
      description: '',
      composition: '',
      dosage: '',
      weightGroup: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setActionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !imageFile) {
      setActionStatus({ type: 'error', message: 'Please fill in Name, Price, Category, and upload an Image.' });
      return;
    }

    setUploading(true);
    setActionStatus(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    formData.append('image', imageFile);

    try {
      const res = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.status === 'success') {
        setActionStatus({ type: 'success', message: `✅ Product "${data.data.name}" uploaded successfully!` });
        fetchAllProducts();
        setTimeout(() => {
          handleReset();
          setActiveTab('manage');
        }, 1200);
      } else {
        setActionStatus({ type: 'error', message: data.message || 'Upload failed.' });
      }
    } catch (err) {
      setActionStatus({ type: 'error', message: 'Server connection failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.status === 'success') {
        setActionStatus({ type: 'success', message: `🗑️ "${name}" deleted successfully!` });
        fetchAllProducts();
        setTimeout(() => setActionStatus(null), 3000);
      } else {
        setActionStatus({ type: 'error', message: data.message || 'Failed to delete.' });
      }
    } catch (err) {
      setActionStatus({ type: 'error', message: 'Server connection failed.' });
    }
  };

  // Derived Stats
  const totalProducts = products.length;
  const foodsCount = products.filter(p => p.category === 'Foods').length;
  const snacksCount = products.filter(p => p.category === 'Snacks & Treats').length;
  const avgRating = products.length > 0 
    ? (products.reduce((acc, p) => acc + (p.rating || 5.0), 0) / products.length).toFixed(1)
    : '5.0';

  // Filter products for the listing tab
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Live Preview Card
  const LivePreviewCard = () => {
    const price = parseFloat(form.price) || 0;
    const originalPrice = parseFloat(form.originalPrice) || 0;
    const discount = originalPrice > price && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

    return (
      <div className="live-preview-card">
        <div className="preview-label">
          <Eye size={12} />
          Live Preview
        </div>
        <div className="preview-card-body">
          <div className="preview-img-container">
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="preview-img" />
            ) : (
              <div className="preview-img-placeholder">
                <Package size={36} color="#ccc" />
                <span>No Image Selected</span>
              </div>
            )}
            {discount > 0 && (
              <span className="preview-badge">{discount}% OFF</span>
            )}
          </div>
          <div className="preview-details">
            <span className="preview-brand">{form.brand || 'BRAND'}</span>
            <h4 className="preview-name">{form.name || 'Product Title'}</h4>
            <p className="preview-desc">{form.description || 'Description description will appear here on the shop catalog...'}</p>
            
            <div className="preview-price-row">
              <div className="preview-prices">
                {originalPrice > 0 && <span className="preview-original">₹{originalPrice.toFixed(2)}</span>}
                <span className="preview-current">{price > 0 ? `₹${price.toFixed(2)}` : '₹0.00'}</span>
              </div>
              <div className="preview-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#f7931e" color="#f7931e" />
                ))}
              </div>
            </div>
            <button className="preview-add-btn" type="button">
              <ShoppingCart size={12} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Nav */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand-box">
          <svg viewBox="0 0 160 50" className="brand-logo-svg">
            <path 
              d="M 15 32 C 10 32, 5 28, 5 20 C 5 10, 15 5, 25 5 C 32 5, 38 10, 38 18 C 38 28, 30 32, 25 32 M 25 15 C 22 15, 20 18, 20 20 C 20 22, 22 24, 25 24 C 28 24, 30 22, 30 20 C 30 18, 28 15, 25 15" 
              fill="none" 
              stroke="#f7931e" 
              strokeWidth="3.5" 
            />
            <text x="50" y="28" fill="white" fontWeight="800" fontSize="20" fontFamily="Outfit">Dr. snoopy</text>
            <text x="50" y="42" fill="rgba(255,255,255,0.6)" fontWeight="600" fontSize="8.5" fontFamily="Inter">ADMIN PANEL</text>
          </svg>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Grid size={18} />
            <span>Overview &amp; Stats</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <Package size={18} />
            <span>Manage Products</span>
            <span className="count-badge">{totalProducts}</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <Plus size={18} />
            <span>Add New Product</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <a href="http://localhost:5173/" className="back-to-shop-btn">
            <ArrowLeft size={16} />
            <span>Back to Storefront</span>
          </a>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="dashboard-workspace">
        {/* Header Bar */}
        <header className="workspace-header">
          <div className="header-breadcrumbs">
            <span className="breadcrumb-parent">Admin Dashboard</span>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current">
              {activeTab === 'overview' && 'Overview & Stats'}
              {activeTab === 'manage' && 'Manage Products'}
              {activeTab === 'add' && 'Add New Product'}
            </span>
          </div>

          <div className="admin-profile-badge">
            <div className="avatar-circle">A</div>
            <div className="profile-info">
              <span className="profile-name">Administrator</span>
              <span className="profile-role">Store Owner</span>
            </div>
          </div>
        </header>

        {/* Dynamic Toast Alerts */}
        {actionStatus && (
          <div className={`dashboard-toast animate-fade ${actionStatus.type}`}>
            {actionStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{actionStatus.message}</span>
          </div>
        )}

        {/* Content Tabs */}
        <div className="workspace-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane animate-fade">
              <div className="dashboard-stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper blue">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Total Products</span>
                    <h3 className="stat-val">{totalProducts}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper orange">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Foods Category</span>
                    <h3 className="stat-val">{foodsCount}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper green">
                    <Users size={24} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Snacks &amp; Treats</span>
                    <h3 className="stat-val">{snacksCount}</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper purple">
                    <Star size={24} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">Average Rating</span>
                    <h3 className="stat-val">{avgRating} ★</h3>
                  </div>
                </div>
              </div>

              {/* Recent Products Summary */}
              <div className="workspace-card" style={{ marginTop: '24px' }}>
                <div className="card-header-row">
                  <h3 className="card-heading-title">Recent Inventory</h3>
                  <button className="view-all-shortcut-btn" onClick={() => setActiveTab('manage')}>
                    View All Inventory &gt;
                  </button>
                </div>
                <div className="recent-products-list">
                  {loadingProducts ? (
                    <div className="tab-loader">
                      <Loader className="spin" size={32} color="#0a58a4" />
                    </div>
                  ) : products.length === 0 ? (
                    <div className="empty-table-state">No products registered yet.</div>
                  ) : (
                    <div className="products-table-wrapper">
                      <table className="products-table">
                        <thead>
                          <tr>
                            <th>Product Details</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.slice(-4).reverse().map((prod) => (
                            <tr key={prod.id}>
                              <td>
                                <div className="product-table-cell-detail">
                                  <img 
                                    src={`${BACKEND_URL}${prod.image}`} 
                                    alt={prod.name} 
                                    className="prod-table-thumb"
                                    onError={(e) => { e.target.src = 'https://placehold.co/100'; }}
                                  />
                                  <div>
                                    <div className="prod-cell-name">{prod.name}</div>
                                    <span className="prod-cell-id">ID: {prod.id}</span>
                                  </div>
                                </div>
                              </td>
                              <td><span className="category-pill">{prod.category}</span></td>
                              <td><strong>{prod.brand}</strong></td>
                              <td><strong className="cell-price">₹{prod.price.toFixed(2)}</strong></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE INVENTORY */}
          {activeTab === 'manage' && (
            <div className="tab-pane animate-fade">
              <div className="workspace-card">
                <div className="card-actions-header">
                  <div className="search-filter-wrapper">
                    <Search className="search-box-icon" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search inventory by title, brand or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="inventory-search-input"
                    />
                  </div>
                  <button className="add-product-accent-btn" onClick={() => setActiveTab('add')}>
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                </div>

                {loadingProducts ? (
                  <div className="tab-loader">
                    <Loader className="spin" size={36} color="#0a58a4" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="empty-table-state">
                    <div className="empty-table-dog">🐕🔍</div>
                    <h4>No matches found</h4>
                    <p>Try searching different terms or add a new product directly.</p>
                  </div>
                ) : (
                  <div className="products-table-wrapper">
                    <table className="products-table">
                      <thead>
                        <tr>
                          <th>Product info</th>
                          <th>Category</th>
                          <th>Brand</th>
                          <th>Sale Price</th>
                          <th>Original Price</th>
                          <th className="align-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((prod) => (
                          <tr key={prod.id}>
                            <td>
                              <div className="product-table-cell-detail">
                                <img 
                                  src={`${BACKEND_URL}${prod.image}`} 
                                  alt={prod.name} 
                                  className="prod-table-thumb"
                                  onError={(e) => { e.target.src = 'https://placehold.co/100'; }}
                                />
                                <div>
                                  <div className="prod-cell-name">{prod.name}</div>
                                  <span className="prod-cell-id">ID: {prod.id}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="category-pill">{prod.category}</span></td>
                            <td><strong>{prod.brand}</strong></td>
                            <td><strong className="cell-price">₹{prod.price.toFixed(2)}</strong></td>
                            <td>
                              <span className="cell-original-price">
                                {prod.originalPrice ? `₹${prod.originalPrice.toFixed(2)}` : '—'}
                              </span>
                            </td>
                            <td className="align-center">
                              <button 
                                className="action-delete-btn"
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ADD PRODUCT */}
          {activeTab === 'add' && (
            <div className="tab-pane animate-fade">
              <div className="add-product-split-workspace">
                {/* Form Panel */}
                <div className="form-workspace-card">
                  <form className="admin-form-pane" onSubmit={handleSubmit}>
                    <div className="form-section-title">New Product Registration</div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Product Title <span className="required">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Eazypet Vet Tablet 10 Tablet"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Brand Name</label>
                        <input
                          type="text"
                          name="brand"
                          value={form.brand}
                          onChange={handleChange}
                          placeholder="e.g. Intas, Zoetis"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Category <span className="required">*</span></label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Foods">Foods</option>
                          <option value="Snacks & Treats">Snacks &amp; Treats</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Weight Group / Tag</label>
                        <input
                          type="text"
                          name="weightGroup"
                          value={form.weightGroup}
                          onChange={handleChange}
                          placeholder="e.g. Dog Health, Puppy Care"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Sale Price (₹) <span className="required">*</span></label>
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="400"
                          min="0"
                          step="0.01"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Original List Price (₹)</label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={form.originalPrice}
                          onChange={handleChange}
                          placeholder="418"
                          min="0"
                          step="0.01"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Brief Catalog Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Provide details displayed inside product detail modals..."
                        className="form-textarea"
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label>Active Chemical Composition</label>
                      <input
                        type="text"
                        name="composition"
                        value={form.composition}
                        onChange={handleChange}
                        placeholder="e.g. Sarolaner, Moxidectin, Pyrantel"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Recommended Dosage Instructions</label>
                      <input
                        type="text"
                        name="dosage"
                        value={form.dosage}
                        onChange={handleChange}
                        placeholder="e.g. 1 tablet monthly or based on body weight"
                        className="form-input"
                      />
                    </div>

                    {/* Image selector */}
                    <div className="form-section-title" style={{ marginTop: '12px' }}>Product Image <span className="required">*</span></div>
                    <div
                      ref={dragRef}
                      className="image-dropzone"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="dropzone-preview">
                          <img src={imagePreview} alt="Preview" className="dropzone-img-thumb" />
                          <div className="dropzone-file-info">
                            <span className="dropzone-filename">{imageFile?.name}</span>
                            <span className="dropzone-filesize">{(imageFile?.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <button
                            type="button"
                            className="dropzone-change-btn"
                            onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="dropzone-empty">
                          <div className="dropzone-icon-ring">
                            <Upload size={22} color="#f7931e" />
                          </div>
                          <p className="dropzone-main-text">Drag &amp; Drop or <span className="dropzone-link">Browse files</span></p>
                          <p className="dropzone-sub-text">Recommended size: 600×600px square ratio</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e.target.files[0])}
                      />
                    </div>

                    <div className="form-action-bar">
                      <button type="button" className="dashboard-clear-btn" onClick={handleReset}>
                        Clear Form
                      </button>
                      <button type="submit" className="dashboard-submit-btn" disabled={uploading}>
                        {uploading ? (
                          <>
                            <Loader size={16} className="spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={16} />
                            <span>Upload to Shop</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Preview Panel */}
                <div className="preview-pane-panel">
                  <LivePreviewCard />
                  
                  <div className="preview-guidelines">
                    <h5 className="guideline-header">💡 Dynamic Upload Guidelines</h5>
                    <ul className="guidelines-list">
                      <li>Use attractive high-fidelity descriptions to improve conversions.</li>
                      <li>Double check active chemical composition list carefully.</li>
                      <li>Adding an original price higher than the active price triggers the horizontal strike-out price display and discount pill on the frontend.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: #f4f6f9;
          font-family: var(--font-body);
          overflow: hidden;
        }

        /* Sidebar Nav */
        .dashboard-sidebar {
          width: 260px;
          background: #061e38;
          color: white;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          box-shadow: 4px 0 20px rgba(6, 30, 56, 0.15);
          z-index: 10;
        }

        .sidebar-brand-box {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .brand-logo-svg {
          width: 140px;
          height: 40px;
        }

        .sidebar-menu {
          padding: 24px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          width: 100%;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .menu-item.active {
          background: var(--secondary-color);
          color: white;
          box-shadow: 0 4px 14px rgba(247, 147, 30, 0.3);
        }

        .count-badge {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.15);
          padding: 2px 8px;
          font-size: 11px;
          border-radius: 999px;
          color: white;
          font-weight: 700;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .back-to-shop-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          text-decoration: none;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .back-to-shop-btn:hover {
          background: white;
          color: #061e38;
          transform: translateY(-1px);
        }

        /* Main Workspace */
        .dashboard-workspace {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .workspace-header {
          background: white;
          height: 70px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          flex-shrink: 0;
        }

        .header-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          font-weight: 600;
        }

        .breadcrumb-parent {
          color: #64748b;
        }

        .breadcrumb-sep {
          color: #cbd5e1;
        }

        .breadcrumb-current {
          color: #0f172a;
          font-weight: 700;
        }

        .admin-profile-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0a58a4, #1e3a8a);
          color: white;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
        }

        .profile-role {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        /* Workspace Body */
        .workspace-body {
          flex-grow: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .tab-pane {
          width: 100%;
        }

        /* Stats Grid */
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
        }

        .stat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-wrapper.blue { background: rgba(10, 88, 164, 0.1); color: #0a58a4; }
        .stat-icon-wrapper.orange { background: rgba(247, 147, 30, 0.1); color: #f7931e; }
        .stat-icon-wrapper.green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .stat-icon-wrapper.purple { background: rgba(168, 85, 247, 0.1); color: #a855f7; }

        .stat-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
        }

        .stat-val {
          font-size: 24px;
          font-weight: 850;
          color: #0f172a;
          margin: 0;
          font-family: var(--font-headers);
        }

        /* Generic Workspace Card */
        .workspace-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .card-header-row {
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-heading-title {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          font-family: var(--font-headers);
        }

        .view-all-shortcut-btn {
          background: transparent;
          border: none;
          color: #0a58a4;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .view-all-shortcut-btn:hover {
          text-decoration: underline;
        }

        /* Card Actions Header */
        .card-actions-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-filter-wrapper {
          position: relative;
          max-width: 480px;
          flex-grow: 1;
        }

        .search-box-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .inventory-search-input {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s;
        }

        .inventory-search-input:focus {
          border-color: #0a58a4;
          box-shadow: 0 0 0 3px rgba(10, 88, 164, 0.1);
        }

        .add-product-accent-btn {
          background: linear-gradient(135deg, #f7931e, #e07b10);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(247, 147, 30, 0.25);
          transition: all 0.25s ease;
        }

        .add-product-accent-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(247, 147, 30, 0.35);
        }

        /* Products Table */
        .products-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .products-table th {
          background: #f8fafc;
          padding: 16px 24px;
          font-size: 12.5px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1.5px solid #e2e8f0;
        }

        .products-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
          color: #334155;
        }

        .products-table tbody tr:hover td {
          background: #f8fafc;
        }

        .product-table-cell-detail {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .prod-table-thumb {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: white;
        }

        .prod-cell-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 14px;
        }

        .prod-cell-id {
          font-size: 11.5px;
          color: #94a3b8;
          font-weight: 500;
        }

        .category-pill {
          background: rgba(10, 88, 164, 0.08);
          color: #0a58a4;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .cell-price {
          color: #0f172a;
          font-size: 14.5px;
        }

        .cell-original-price {
          text-decoration: line-through;
          color: #94a3b8;
          font-size: 13px;
        }

        .align-center {
          text-align: center;
        }

        .action-delete-btn {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-delete-btn:hover {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
          transform: scale(1.05);
        }

        .empty-table-state {
          padding: 60px 20px;
          text-align: center;
        }

        .empty-table-dog {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .empty-table-state h4 {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .empty-table-state p {
          font-size: 13.5px;
          color: #64748b;
          margin: 0;
        }

        .tab-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
        }

        /* Dynamic Toasts */
        .dashboard-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 10000;
          font-weight: 700;
          font-size: 14.5px;
          border: 1.5px solid transparent;
        }

        .dashboard-toast.success {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #15803d;
        }

        .dashboard-toast.error {
          background: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }

        /* Split Workspace (Add Product Pane) */
        .add-product-split-workspace {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 30px;
          align-items: start;
        }

        .form-workspace-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .admin-form-pane {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-action-bar {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 14px;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
        }

        .dashboard-clear-btn {
          background: #f1f5f9;
          border: 1.5px solid #cbd5e1;
          color: #475569;
          padding: 11px 22px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dashboard-clear-btn:hover {
          background: #e2e8f0;
        }

        .dashboard-submit-btn {
          background: linear-gradient(135deg, #f7931e, #e07b10);
          border: none;
          color: white;
          padding: 11px 30px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(247, 147, 30, 0.25);
          transition: all 0.25s ease;
        }

        .dashboard-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(247, 147, 30, 0.35);
        }

        .dashboard-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .preview-pane-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .preview-guidelines {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
        }

        .guideline-header {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 10px;
        }

        .guidelines-list {
          padding-left: 16px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .guidelines-list li {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
        }

        /* Embedded forms styling styles */
        .form-section-title {
          font-size: 12px;
          font-weight: 700;
          color: #0a58a4;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 700;
          color: #334155;
        }

        .required {
          color: #ef4444;
        }

        .form-input, .form-select, .form-textarea {
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          color: #0f172a;
          background: #f8fafc;
          transition: all 0.2s;
          font-family: var(--font-body);
          outline: none;
          box-sizing: border-box;
          width: 100%;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #0a58a4;
          background: white;
          box-shadow: 0 0 0 3px rgba(10, 88, 164, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 72px;
        }

        /* Dropzone */
        .image-dropzone {
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          background: #f8fafc;
        }

        .image-dropzone:hover, .image-dropzone.drag-over {
          border-color: #f7931e;
          background: rgba(247, 147, 30, 0.03);
        }

        .dropzone-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }

        .dropzone-icon-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(247, 147, 30, 0.08);
          border: 2px solid rgba(247, 147, 30, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dropzone-main-text {
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          margin: 0;
        }

        .dropzone-link {
          color: #f7931e;
          text-decoration: underline;
        }

        .dropzone-sub-text {
          font-size: 11.5px;
          color: #64748b;
          margin: 0;
        }

        .dropzone-preview {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dropzone-img-thumb {
          width: 52px;
          height: 52px;
          object-fit: cover;
          border-radius: 8px;
          border: 1.5px solid #cbd5e1;
        }

        .dropzone-file-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .dropzone-filename {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 280px;
        }

        .dropzone-filesize {
          font-size: 11.5px;
          color: #64748b;
        }

        .dropzone-change-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          color: #475569;
          transition: background 0.2s;
        }

        .dropzone-change-btn:hover {
          background: #e2e8f0;
        }

        /* Live Preview Card styles inside dashboard context */
        .live-preview-card {
          background: white;
          border: 2px solid #f7931e;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(247, 147, 30, 0.15);
        }

        .preview-label {
          background: linear-gradient(90deg, #f7931e, #e07b10);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .preview-card-body {
          display: flex;
          flex-direction: column;
        }

        .preview-img-container {
          position: relative;
          height: 180px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-img-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #cbd5e1;
          font-size: 12px;
        }

        .preview-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .preview-details {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .preview-brand {
          font-size: 10px;
          font-weight: 800;
          color: #f7931e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .preview-name {
          font-size: 14px;
          font-weight: 800;
          color: #0a58a4;
          line-height: 1.3;
          margin: 0;
          font-family: var(--font-headers);
        }

        .preview-desc {
          font-size: 11.5px;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .preview-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }

        .preview-prices {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .preview-original {
          font-size: 11px;
          text-decoration: line-through;
          color: #94a3b8;
        }

        .preview-current {
          font-size: 15px;
          font-weight: 800;
          color: #0a58a4;
        }

        .preview-stars {
          display: flex;
          gap: 1px;
        }

        .preview-add-btn {
          margin-top: 8px;
          background: #0a58a4;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
        }

        .spin {
          animation: spinAnim 1s linear infinite;
        }

        @keyframes spinAnim {
          to { transform: rotate(360deg); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .add-product-split-workspace {
            grid-template-columns: 1fr;
          }
          .preview-pane-panel {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            flex-direction: column;
          }
          .dashboard-sidebar {
            width: 100%;
            height: auto;
          }
          .sidebar-brand-box {
            padding: 16px;
          }
          .sidebar-menu {
            padding: 10px;
            flex-direction: row;
            overflow-x: auto;
          }
          .menu-item {
            padding: 8px 12px;
            font-size: 13px;
            white-space: nowrap;
          }
          .count-badge {
            margin-left: 6px;
          }
          .workspace-header {
            padding: 0 16px;
            height: 60px;
          }
          .workspace-body {
            padding: 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .dashboard-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .stat-card {
            padding: 16px;
          }
          .stat-val {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
