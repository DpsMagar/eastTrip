import React, { useEffect, useState } from 'react'
import Search from '../../Components/Search2/TwoSearch'
import Result from '../../Components/ResultBox/Result'
import "./SearchPage.css"
import Result2 from '../../Components/ResultBox/Result2'
import Result3 from '../../Components/ResultBox/Result3'
import PlaneResult from '../../Components/ResultBox/PlaneResult'

const SearchPage = () => {
  const [resultType, setResultType] = useState(null);

  useEffect(() => {
    const storedValue = localStorage.getItem('active'); 
    
    if (storedValue) {
      setResultType(storedValue);
    }
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
        return <div style={{ padding: "2rem", textAlign: "center" }}>No results to display.</div>;
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
