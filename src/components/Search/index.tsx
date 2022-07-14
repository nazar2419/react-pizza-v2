import { useContext, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../layouts/MainLayout';
import styles from './Search.module.scss';
import { useState } from 'react';

const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const { setSearchValue  }:any = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
      console.log('hello');
    }, 410),
    [],
  );

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value)
  }


  return (
    <div className={styles.root}>
     <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={styles.icon}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round"
           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
      <input
        ref={inputRef}
        value={value} 
        onChange={onChangeInput} 
        className={styles.input} placeholder='Search pizza...' 
      />
      {value && (
        <svg 
          onClick={onClickClear}
          xmlns="http://www.w3.org/2000/svg" 
          className={styles.clearIcon} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 18L18 6M6 6l12 12" 
            />
        </svg>
      )}
    </div>

  )
}


export default Search;
