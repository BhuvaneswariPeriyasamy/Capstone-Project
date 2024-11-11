// src/components/ProductListing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories for dropdown
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Set filter based on clicked category from home page (if available)
    const categoryFromHome = new URLSearchParams(location.search).get('category');
    setSelectedCategory(categoryFromHome || 'all');
  }, [location]);

  useEffect(() => {
    // Fetch products based on selected category
    const url = selectedCategory === 'all'
      ? 'http://localhost:5000/products/category'
      : `http://localhost:5000/products/category/${selectedCategory}`;

    axios.get(url)
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/productdetails/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Add your logic to add the product to the cart, e.g., update cart context or send to backend
    // Example: updateCart(product) if using context
  };

  return (
    <div className="product-listing-page">
      <h1>Product Listings</h1>

      {/* Category Filter Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-filter"
      >
        <option value="all" key="all">All</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map(product => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => handleProductClick(product._id)}
          >
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            
            {/* Add to Cart Button */}
            <button
              className="add-to-cart-button1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation to product details
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;