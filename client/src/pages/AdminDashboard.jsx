import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    retailPrice: "",
    wholesalerPrice: "",
    stock: "",
    description: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("category", formData.category);
      productData.append("retailPrice", formData.retailPrice);
      productData.append("wholesalerPrice", formData.wholesalerPrice);
      productData.append("stock", formData.stock);
      productData.append("description", formData.description);

      if (thumbnail) {
        productData.append("thumbnail", thumbnail);
      }

      images.forEach((image) => {
        productData.append("images", image);
      });

      await axios.post("http://localhost:5000/api/products/add", productData);

      setFormData({
        name: "",
        category: "",
        retailPrice: "",
        wholesalerPrice: "",
        stock: "",
        description: "",
      });

      setThumbnail(null);
      setImages([]);

      getProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Add products and manage wholesale pricing.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <form className="dashboard-form" onSubmit={handleAddProduct}>
          <h2>Add Product</h2>

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="retailPrice"
            placeholder="Retail Price"
            value={formData.retailPrice}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="wholesalerPrice"
            placeholder="Wholesaler Price"
            value={formData.wholesalerPrice}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <label>Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
          />

          <button type="submit">Add Product</button>
        </form>

        <div className="products-panel">
          <h2>Products</h2>

          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                {product.thumbnail && (
                  <img
                    className="product-thumb"
                    src={`http://localhost:5000${product.thumbnail}`}
                    alt={product.name}
                  />
                )}

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                </div>

                <div className="price-row">
                  <span>Retail: Rs {product.retailPrice}</span>
                  <span>Wholesale: Rs {product.wholesalerPrice}</span>
                </div>

                <p>Stock: {product.stock}</p>
                <p>{product.description}</p>

                <div className="product-images">
                  {product.images?.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${image}`}
                      alt={product.name}
                    />
                  ))}
                </div>
              </div>
            ))}

            {products.length === 0 && <p>No products added yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}