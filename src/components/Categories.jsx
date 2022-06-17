import { useState } from 'react';

export default function Categories({ value, onClickCategory }) {
  const categories = [
    'All',
    'Meat',
    'Vegetarian',
    'Grill',
    'Acute',
    'Closed',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))
        }
      </ul>
    </div>
  );
}