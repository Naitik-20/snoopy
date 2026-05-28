import { ShoppingCart, Eye } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onProductClick, backendUrl }) {
  const {
    id,
    name = 'Premium Pet Product',
    brand = '',
    price = 0,
    mrp = 0,
    image,
    stock = 10
  } = product;

  // Calculate discount percentage dynamically based on MRP and active sale price
  const discount = mrp > price ? Math.round((1 - price / mrp) * 100) : 0;

  // Gracefully handle images from remote URLs, local uploads, or Unsplash fallbacks
  const imgSrc = image
    ? (image.startsWith('http') ? image : `${backendUrl}/${image}`)
    : 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80';

  return (
    <article className="product-card-premium" onClick={() => onProductClick(product)}>
      <div className="product-card-media-wrapper">
        {/* Discount & Stock Badges */}
        {discount > 0 && stock > 0 && (
          <span className="product-card-badge discount-badge">{discount}% OFF</span>
        )}
        {stock === 0 && (
          <span className="product-card-badge stockout-badge">Out of Stock</span>
        )}
        
        {/* Product Media Image */}
        <img
          src={imgSrc}
          alt={name}
          className="product-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80';
          }}
        />

        {/* Quick View Glassmorphism Overlay */}
        <div className="product-card-overlay">
          <button className="product-card-overlay-btn" aria-label="Quick View">
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <div className="product-card-details">
        {/* Brand Label */}
        {brand && <span className="product-card-brand">{brand}</span>}
        
        {/* Product Name Title */}
        <h3 className="product-card-title">{name}</h3>

        {/* Footer Details - Price and Cart trigger */}
        <div className="product-card-footer">
          <div className="product-card-price-container">
            <span className="product-card-price">₹{price.toLocaleString()}</span>
            {mrp > price && (
              <span className="product-card-mrp">₹{mrp.toLocaleString()}</span>
            )}
          </div>

          <button
            className="product-card-cart-btn"
            onClick={(e) => {
              e.stopPropagation(); // Stop click propagation to parent card link (to prevent detail modal opening)
              if (stock > 0) onAddToCart(product);
            }}
            disabled={stock === 0}
            aria-label={stock === 0 ? "Out of stock" : "Add to cart"}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}