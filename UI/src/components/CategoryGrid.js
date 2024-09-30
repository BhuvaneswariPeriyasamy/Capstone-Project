import React from 'react';
import bed from '../images/bed1_ey6xdx_c_scale,w_659.jpg';
import chair from '../images/chair1_klpad1_c_scale,w_594.jpg';
import shelve from '../images/shelves2_tcoaib_c_scale,w_516.jpg';
import tables from '../images/table2_wnpyzi_c_scale,w_432.jpg';
const categories = [
  { id: 1, name: 'Beds', image: bed },
  { id: 2, name: 'Chairs', image: chair },
  { id: 3, name: 'Shelves', image: shelve },
  { id: 4, name: 'Tables', image: tables },
];

const CategoryGrid = () => {
  return (
    <section className="category-grid">
       <h1 className="product-header">Product Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
