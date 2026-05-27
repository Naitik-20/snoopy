import axios from "axios";
import { useState } from "react";

export default function AddWholesaler() {
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWholesaler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wholesalers/add",
        formData
      );

      alert("Wholesaler added successfully!");
      console.log(res.data);

      setFormData({
        name: "",
        shopName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add wholesaler");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleAddWholesaler}>
        <h2>Add Wholesaler</h2>

        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email optional"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Wholesaler</button>
      </form>
    </div>
  );
}