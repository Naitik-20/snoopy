import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import BookingCalendarPage from './components/BookingCalendarPage';
import OnlineConsultationPage from './components/OnlineConsultationPage';
import ContactPage from './components/ContactPage';
import HomePage from './pages/HomePage';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

function CategoryUpdater({ setSelectedCategory }) {
  const { categoryName } = useParams();
  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    } else {
      setSelectedCategory('All Products');
    }
    // High-fidelity page scroll to top on category transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName, setSelectedCategory]);
  return null;
}

function App() {
  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('Recommended');

  // UI Modals toggles
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Business state
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    if (category === 'All Products') {
      navigate('/');
    } else {
      navigate(`/category/${encodeURIComponent(category)}`);
    }
  };



  // Fetch products from backend based on filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        maxPrice: priceRange.toString(),
        sort: sortBy === 'Price: Low to High' ? 'price-asc' : 
              sortBy === 'Price: High to Low' ? 'price-desc' :
              sortBy === 'Popularity' ? 'popularity' : 'Recommended'
      });

      const res = await fetch(`${BACKEND_URL}/api/products?${queryParams}`);
      const data = await res.json();
      
      if (data.status === 'success') {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  useEffect(() => {
    // Debounce search input to avoid spamming the backend
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    // Auto-open cart for premium micro-experience feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
  };

  return (
    <div className="app-layout">
      <Routes>
        <Route path="/" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
        <Route path="/shop" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
        <Route path="/category/:categoryName" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
        <Route path="/services" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
        <Route path="/contact" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
        <Route path="/consultation" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />}/>
        <Route path="/online-consultation/:serviceId" element={<CategoryUpdater setSelectedCategory={setSelectedCategory} />} />
      </Routes>
      
      {/* Site Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />

      {/* Dynamic Main Body Content based on Path */}
      <Routes>
        {/* Booking Calendar / Online Consultation Route */}
        <Route path="/online-consultation/:serviceId" element={<BookingCalendarPage />} />

        {/* Services Page Route */}
        <Route path="/services" element={<ServicesPage />} />

        {/* Contact Page Route */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Online Consultation Route */}
        <Route path="/consultation" element={ <OnlineConsultationPage onLoginClick={() => setIsAuthOpen(true)}  /> } />        
      
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Catalog Main Layout (Catch-all for /shop and /category/*) */}
        <Route 
          path="/*" 
          element={
            <main className="main-content-layout container">
              {/* Breadcrumb strip */}
              <div className="breadcrumb-strip">
                <span>Home</span>
                <span className="breadcrumb-arrow">&gt;</span>
                <span className="active-breadcrumb">{selectedCategory}</span>
              </div>

              {/* Title and sorting headers */}
              <div className="catalog-header-row">
                <h1 className="catalog-main-title">{selectedCategory}</h1>
                
                <div className="catalog-actions-row">
                  {/* Mobile Filter Button */}
                  <button className="mobile-filter-trigger" onClick={() => setIsMobileSidebarOpen(true)}>
                    <SlidersHorizontal size={16} />
                    <span>Filters</span>
                  </button>

                  {/* Sorting Dropdown */}
                  <div className="sort-dropdown-container">
                    <span className="sort-label">Sort by:</span>
                    <div className="sort-select-wrapper">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                      >
                        <option value="Recommended">Recommended</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                        <option value="Popularity">Popularity</option>
                      </select>
                      <ArrowUpDown size={14} className="sort-icon-chevron" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Workspace Body Grid */}
              <div className="catalog-body-grid">
                {/* Desktop Sidebar Filters */}
                <Sidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={handleCategoryChange}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  isOpen={isMobileSidebarOpen}
                  onClose={() => setIsMobileSidebarOpen(false)}
                />

                {/* Products Content Area */}
                <div className="products-grid-wrapper">
                  {loading ? (
                    /* Skeletal Loaders */
                    <div className="products-grid">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="product-skeleton-card">
                          <div className="skeleton skeleton-img"></div>
                          <div className="skeleton-details">
                            <div className="skeleton skeleton-text short"></div>
                            <div className="skeleton skeleton-text title"></div>
                            <div className="skeleton skeleton-text desc"></div>
                            <div className="skeleton-footer">
                              <div className="skeleton skeleton-text price"></div>
                              <div className="skeleton skeleton-btn"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : products.length === 0 ? (
                    /* Empty Search Results */
                    <div className="catalog-empty-state">
                      <div className="empty-dog-illustration">🐕💨</div>
                      <h3>No products found</h3>
                      <p>We couldn't find matches. Try adjusting your category filters or search keywords.</p>
                      <button 
                        className="reset-filters-btn"
                        onClick={() => {
                          setSearchTerm('');
                          handleCategoryChange('All Products');
                          setPriceRange(2000);
                        }}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    /* Products Cards Grid */
                    <div className="products-grid animate-fade">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onProductClick={setSelectedProduct}
                          backendUrl={BACKEND_URL}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </main>
          }
        />
      </Routes>

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutSuccess}
        backendUrl={BACKEND_URL}
      />

      {/* Login / Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={setUser}
        backendUrl={BACKEND_URL}
      />

      {/* Product Detailed Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          backendUrl={BACKEND_URL}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Localized custom scoped CSS styles */}
      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content-layout {
          flex-grow: 1;
          padding-top: 24px;
          padding-bottom: 60px;
        }

        /* Breadcrumb navigation */
        .breadcrumb-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-medium);
          margin-bottom: 24px;
        }

        .breadcrumb-arrow {
          font-size: 12px;
          color: var(--text-light);
        }

        .active-breadcrumb {
          color: var(--text-dark);
          font-weight: 600;
        }

        /* Catalog Title & Sort block */
        .catalog-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
        }

        .catalog-main-title {
          font-size: 44px;
          font-weight: 850;
          color: var(--secondary-color);
          font-family: var(--font-headers);
          line-height: 1.1;
        }

        .catalog-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-filter-trigger {
          display: none;
          background: white;
          border: 1px solid var(--border-light);
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-dark);
          box-shadow: var(--shadow-sm);
        }

        .sort-dropdown-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-medium);
        }

        .sort-select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .sort-select {
          appearance: none;
          -webkit-appearance: none;
          background: white;
          border: 1px solid var(--border-light);
          padding: 8px 36px 8px 16px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
          border-radius: var(--radius-sm);
          outline: none;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .sort-select:focus {
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 3px rgba(247, 147, 30, 0.1);
        }

        .sort-icon-chevron {
          position: absolute;
          right: 12px;
          pointer-events: none;
          color: var(--text-medium);
        }

        /* Workspace Grid */
        .catalog-body-grid {
          display: flex;
          gap: 30px;
        }

        .products-grid-wrapper {
          flex-grow: 1;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        /* Skeleton Loaders Styling */
        .product-skeleton-card {
          background: white;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          height: 380px;
          display: flex;
          flex-direction: column;
        }

        .skeleton-img {
          height: 200px;
          width: 100%;
        }

        .skeleton-details {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .skeleton-text {
          height: 12px;
          border-radius: var(--radius-sm);
        }

        .skeleton-text.short {
          width: 40%;
        }

        .skeleton-text.title {
          height: 18px;
          width: 80%;
        }

        .skeleton-text.desc {
          height: 32px;
          width: 100%;
        }

        .skeleton-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .skeleton-text.price {
          height: 18px;
          width: 30%;
        }

        .skeleton-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        /* Empty state search and filter triggers */
        .catalog-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        .empty-dog-illustration {
          font-size: 54px;
          margin-bottom: 16px;
        }

        .catalog-empty-state h3 {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .catalog-empty-state p {
          color: var(--text-medium);
          font-size: 14.5px;
          max-width: 400px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .reset-filters-btn {
          background-color: var(--secondary-color);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .reset-filters-btn:hover {
          background-color: var(--secondary-hover);
        }


        @media (max-width: 768px) {
          .catalog-main-title {
            font-size: 32px;
          }

          .catalog-header-row {
            margin-bottom: 24px;
          }

          .mobile-filter-trigger {
            display: flex;
          }

          .sort-label {
            display: none; /* hide label on mobile to save space */
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 12px;
          }

          .product-skeleton-card {
            height: 320px;
          }

          .skeleton-img {
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
