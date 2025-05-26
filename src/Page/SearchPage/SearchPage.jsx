import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../../Components/Search2/TwoSearch';
import './SearchPage.css';
import Result2 from '../../Components/ResultBox/Result2';
import PlaneResult from '../../Components/ResultBox/PlaneResult';
import Result3 from '../../Components/ResultBox/Result3';

const SearchPage = () => {
  const location = useLocation();
  // Get active tab from navigation state first, then localStorage
  const [resultType, setResultType] = useState(
    location.state?.activeTab || localStorage.getItem('active') || 'flights'
  );

  // Update when navigation state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setResultType(location.state.activeTab);
      localStorage.setItem('active', location.state.activeTab);
    }
  }, [location.state]);

  const renderResultContainer = () => {
    switch (resultType) {
      case 'flights':
        return <PlaneResult />;
      case 'hotels':
        return <Result2 />;
      case 'homeStays':
        return <Result3 />;
      default:
        return <div>No results found. Please update your search.</div>;
    }
  };

  return (
    <section className="page-content">
      <div className="box">
        <Search />
        {renderResultContainer()}
      </div>
    </section>  
  );
};

export default SearchPage;