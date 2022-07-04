import React from 'react';
import { Link } from 'react-router-dom';
import cartEmtyImg from '../assets/img/empty-cart.png';


const CartEmty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty <icon>😕</icon></h2>
        <p>
          You probably haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={cartEmtyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Come back</span>
        </Link>
      </div>
    </>
  )

}

export default CartEmty;