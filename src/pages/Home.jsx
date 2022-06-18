import { useState, useEffect } from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    fetch(`https://629f57d88b939d3dc2959983.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) =>  res.json())
      .then((arr)=> {
        setItems(arr);
        setIsLoading(false);
    });
    window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons =  [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {
              isLoading ? skeletons :
              pizzas
            }
          </div>
          <Pagination onChangePage ={(number) => setCurrentPage(number)}/>
      </div>
    </>
  )
}

export default Home;