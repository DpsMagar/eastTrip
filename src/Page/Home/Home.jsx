import React from 'react';
import Search from '../../Components/SearchBar/Search';
import Box from '../../Components/Boxcard/BigBox';
import './Home.css';
import himal from '../../Assest/himal.png';

const Home = () => {
  return (
    <section className="home-background">
      <div className="home-wrapper">
        <div className="hero-section">
          <img src={himal} alt="Himalayas" className="hero-bg" />
          <div className="search-overlay">
            <Search />
          </div>
        </div>

        <div className="home-content">
          <Box />
        </div>
      </div>
    </section>
  );
};

export default Home;
