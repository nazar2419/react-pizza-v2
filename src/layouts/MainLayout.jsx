import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useState, createContext } from 'react';

export const SearchContext = createContext('');

export const MainLayout = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Outlet/>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default MainLayout;