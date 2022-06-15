import { useState, useEffect } from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://629f57d88b939d3dc2959983.mockapi.io/items')
      .then((res) =>  res.json())
      .then((arr)=> {
        setItems(arr);
        setIsLoading(false);
    });
    window.scrollTo(0,0);
  }, [])

  return (
    <>
      <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {
              isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) :
              items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
          </div>
        </div>
    </>
  )
}

export default Home;