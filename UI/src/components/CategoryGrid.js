<<<<<<< HEAD
import React,{ useEffect, useState } from 'react';
=======
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
import axios from 'axios';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
=======
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data)})
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
  return (
    <section className="category-grid">
       <h1 className="product-header">Product Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
<<<<<<< HEAD
          <div key={category._id} className="category-card">
            <img src={`${category.image}`} alt={category.name} />
=======
          <div key={category._id} className="category-card" onClick={() => navigate(`/products?category=${category._id}`)}>
            <img src={category.imageUrl} alt={category.name} />
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
            <h3>{category.name}</h3>
        </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
