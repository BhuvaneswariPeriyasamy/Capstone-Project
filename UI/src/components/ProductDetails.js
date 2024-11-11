// src/components/ProductDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/productdetails/product/${productId}`)
      .then(response => {
        console.log("Product details fetched");
        setProduct(response.data);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  // Add to Cart function
  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    // Add the logic to add this product to the cart, e.g., update cart context or send to backend
    // Example: updateCart(product) if using context
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className='product-back'>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <img className="product-image" src={product.imageUrl} alt={product.name} />
        <p className="product-price">Price: ${product.price}</p>
        <h2>Description</h2>
        <p>{product.description.description || 'No description available.'}</p>
        
        {/* Display subtopics */}
        <div className="product-subtopics">
          <h3>Features</h3>
          <p>{product.description.features || 'Not available'}</p>

          <h3>Dimensions</h3>
          <p>{product.description.dimensions || 'Not available'}</p>

          <h3>Materials</h3>
          <p>{product.description.materials || 'Not available'}</p>

          <h3>Care Instructions</h3>
          <p>{product.description.careInstructions || 'Not available'}</p>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
