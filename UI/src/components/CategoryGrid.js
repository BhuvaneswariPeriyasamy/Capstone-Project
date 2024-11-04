import React,{ useEffect, useState } from 'react';
import axios from 'axios';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  return (
    <section className="category-grid">
       <h1 className="product-header">Product Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
          <div key={category._id} className="category-card">
            <img src={`${category.image}`} alt={category.name} />
            <h3>{category.name}</h3>
        </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
