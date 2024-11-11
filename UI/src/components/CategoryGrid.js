<<<<<<< HEAD
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
=======
<<<<<<< HEAD
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
=======
<<<<<<< HEAD
import React,{ useEffect, useState } from 'react';
=======
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
import axios from 'axios';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data)})
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
  return (
    <section className="category-grid">
       <h1 className="product-header">Product Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
<<<<<<< HEAD
          <div key={category._id} className="category-card" onClick={() => navigate(`/products?category=${category._id}`)}>
            <img src={category.imageUrl} alt={category.name} />
=======
<<<<<<< HEAD
          <div key={category._id} className="category-card" onClick={() => navigate(`/products?category=${category._id}`)}>
            <img src={category.imageUrl} alt={category.name} />
=======
<<<<<<< HEAD
          <div key={category._id} className="category-card">
            <img src={`${category.image}`} alt={category.name} />
=======
          <div key={category._id} className="category-card" onClick={() => navigate(`/products?category=${category._id}`)}>
            <img src={category.imageUrl} alt={category.name} />
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
            <h3>{category.name}</h3>
        </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
