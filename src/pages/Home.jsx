import { useEffect, useContext } from "react";
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {sortList} from "../components/Sort";
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from "../redux/slices/pizzaSlice";

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

  const {items, status} = useSelector((state) => state.pizza);
  console.log(status);
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
 
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);
 

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  }

  const getPizzas = async () => {

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage
      }),
    );
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
      getPizzas();
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
          { status === 'error' ? (
            <div className="content__error-info">
              <h2>An error occurred <icon>😕</icon></h2>
              <p>
                Sorry, but the pizzas could not be get. Please try again later
              </p>
            </div>
            ) : (
              <div className="content__items">
                {
                  status === 'loading' ? skeletons : pizzas
                }
              </div>
            )
          }
          <Pagination currentPage={currentPage} onChangePage ={onChangePage}/>
      </div>
    </>
  )
}

export default Home;