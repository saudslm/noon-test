import React, {createContext, useState} from 'react';
import api from '../services/api';

export const ProductListContext = createContext();

const ProductListContextProvider = props => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useState({
    search: '',
    barcode: '',
    name: '',
    brand: '',
    manufacturer: '',
    page: 1
  });

  const updateSearchParams = (params) => {
      const newSearchParams = {...searchParams, ...params, page: 1};
      setSearchParams(newSearchParams);
      getProducts(newSearchParams);
  }

  const getProducts = (params, updatePageFlag = false) => {
    api.searchProducts(params)
    .then(response => response.data)
    .then(data => data.products)
    .then(products => {
        // set state
        setProducts(products);
        if (updatePageFlag)
            setSearchParams({...searchParams, page: params.page});
    })
    .catch(e => {
        console.log('error', e);
    });

  };

  const updatePage = (page) => {
    getProducts({...searchParams, page: parseInt(page)}, true);
  }

  return (
    <ProductListContext.Provider value={{
        products,
        pageNumber: searchParams.page,
        updatePage,
        updateSearchParams
    }}>
      {props.children}
    </ProductListContext.Provider>
  );
};

export default ProductListContextProvider;