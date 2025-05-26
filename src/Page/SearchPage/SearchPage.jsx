import React, { useEffect, useState } from 'react';
import Search from '../../Components/Search2/TwoSearch';
import './SearchPage.css';
import Result2 from '../../Components/ResultBox/Result2';
import PlaneResult from '../../Components/ResultBox/PlaneResult';
import Result3 from '../../Components/ResultBox/Result3';

const SearchPage = () => {
  const [resultType, setResultType] = useState(() => {
    return localStorage.getItem('active') || 'flights'; // Set default to 'flights'
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem('active');
      if (storedValue) {
        setResultType(storedValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
