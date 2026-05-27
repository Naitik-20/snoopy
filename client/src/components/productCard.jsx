import "./site.css";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <a className="product-media" href={product.href}>
        <img src={product.image} alt={product.name} />
        <span className="quick-view">Quick View</span>
      </a>

      <a className="product-info" href={product.href}>
        <h3>{product.name}</h3>
        <div className="price-row">
          <span className="price-label">Regular Price</span>
          <span className="regular-price">{product.regularPrice}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Sale Price</span>
          <span className="sale-price">{product.salePrice}</span>
        </div>
      </a>

      <button className="add-cart-button">Add to Cart</button>
    </article>
  );
}