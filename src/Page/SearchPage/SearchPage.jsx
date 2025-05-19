import React, { useEffect, useState } from 'react'
import Search from '../../Components/Search2/TwoSearch'
import "./SearchPage.css"
import Result2 from '../../Components/ResultBox/Result2'
import PlaneResult from '../../Components/ResultBox/PlaneResult'
import Result3 from '../../Components/ResultBox/Result3'
import FlightCard from '../../Components/Boxcard/FlightCard'

const SearchPage = () => {
  const [resultType, setResultType] = useState(null);

  useEffect(() => {
    const storedValue = localStorage.getItem('active'); 
    
    if (storedValue) {
      setResultType(storedValue);
    }
  }, []);

  const renderResultContainer = () => {
    // eslint-disable-next-line default-case
    switch (resultType) {
      case 'flights':
        return <PlaneResult/>;
      case 'hotels':
        return <Result2/>;
      case 'homeStays':
        return <Result3/>;
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
}

export default SearchPage;