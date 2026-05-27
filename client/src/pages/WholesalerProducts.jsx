import axios from "axios";
import { useEffect, useState } from "react";

export default function WholesalerProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Wholesale Products</h1>
          <p>Compare retail and wholesale prices.</p>
        </div>
      </div>

      <div className="comparison-grid">
        {products.map((product) => {
          const saving = product.retailPrice - product.wholesalerPrice;

          return (
            <div className="comparison-card" key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>

              <div className="compare-box">
                <div>
                  <span>Retail Price</span>
                  <strong>Rs {product.retailPrice}</strong>
                </div>

                <div>
                  <span>Wholesale Price</span>
                  <strong>Rs {product.wholesalerPrice}</strong>
                </div>
              </div>

              <p className="saving">You save Rs {saving}</p>
              <p>Available Stock: {product.stock}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}