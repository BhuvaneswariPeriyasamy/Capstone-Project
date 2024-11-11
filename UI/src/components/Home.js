import React from 'react';
import Banner from './Banner';
import CategoryGrid from './CategoryGrid';

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='home-image'>
      <CategoryGrid />
      </div>
    </div>
  );
};

export default Home;
