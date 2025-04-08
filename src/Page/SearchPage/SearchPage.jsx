import React from 'react'
import Search from '../../Components/Search2/TwoSearch'
import Result from '../../Components/ResultBox/Result'
import "./SearchPage.css"
const SearchPage = () => {
  return (
    <section className="page-content">
    <div className="box">
    <Search />
    <Result />
    </div>

  </section>
  )
}

export default SearchPage