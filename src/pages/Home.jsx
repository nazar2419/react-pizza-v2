import { useState, useEffect, useContext } from "react";
import qs from 'qs';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {sortList} from "../components/Sort";
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { SearchContext } from "../App";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";
import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  }

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    
  
    axios.get(
      `https://629f57d88b939d3dc2959983.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
  }
  // If the parameters were changed and there was a first render
  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
    
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);
  // If there was a first render, then check the URl parameters and save in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);
  // If there was a first render, then we request pizzas
  useEffect(() => {
    window.scrollTo(0,0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons =  [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onChangeCategory}/>
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {
              isLoading ? skeletons :
              pizzas
            }
          </div>
          <Pagination currentPage={currentPage} onChangePage ={onChangePage}/>
      </div>
    </>
  )
}

export default Home;