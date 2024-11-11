import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data)})
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <section className="category-grid">
       <h1 className="product-header">Product Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
          <div key={category._id} className="category-card" onClick={() => navigate(`/products?category=${category._id}`)}>
            <img src={category.imageUrl} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
