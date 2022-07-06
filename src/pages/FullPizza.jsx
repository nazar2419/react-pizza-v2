import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function FullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://629f57d88b939d3dc2959983.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error when we try get pizzas ');
        navigate('/');
      } 
    }

    fetchPizza()
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}$</h4>
    </div>
  );
}

export default FullPizza;