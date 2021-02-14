import React, {useCallback, useState, useEffect, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ProductList from '../../domain/Product/ProductList';
import ProductSearchForm from '../../domain/Product/ProductSearchForm';
import Pagination from '../../components/Pagination';
import { AppContext } from '../../context/AppContext';

import api from '../../services/api';

const Catalog = () => {
  const {onError} = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    search: '',
    barcode: '',
    name: '',
    brand: '',
    manufacturer: '',
    page: 1
  });
  const history = useHistory();
  const location = useLocation();

  // event handlers

  // Initialize search params state based on url params on first render
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParamsObj = {};

    if (params.has('search')) {
      queryParamsObj.search = params.get('search');
    }
    if (params.has('barcode')) {
      queryParamsObj.barcode = params.get('barcode');
    }
    if (params.has('name')) {
      queryParamsObj.name = params.get('name');
    }
    if (params.has('brand')) {
      queryParamsObj.brand = params.get('brand');
    }
    if (params.has('manufacturer')) {
      queryParamsObj.manufacturer = params.get('manufacturer');
    }
    if (params.has('page')) {
      queryParamsObj.page = parseInt(params.get('page')) || 1;
    }

    updateSearchParams(queryParamsObj);

    if( Object.keys(queryParamsObj).length > 1 ) {
      getProducts(queryParamsObj);
    }
  }, []);

  // update search params state
  const updateSearchParams = useCallback((params) => {
    const newSearchParams = {...searchParams, ...params};
    setSearchParams(newSearchParams);
  }, [searchParams]);

  // get products based on current search params
  const onSearchSubmit = () => {
    updateSearchParams({page: 1});
    getProducts(searchParams);
  }

  // make request to the api to fetch products
  const getProducts = (params) => {
    updateQueryParams(params);
    api.searchProducts(params)
    .then(products => {
        // set state
        setProducts(products);
    })
    .catch(e => {
      // implement send alert
      onError('warning', e.response.statusText);
      //setProducts([]);
    });

  };

  // update page and fetch products for selected page
  const updatePage = (page) => {
    updateSearchParams({page: parseInt(page)});
    getProducts({...searchParams, page: parseInt(page)});
  }

  // update query params in the url
  const updateQueryParams = (sParams) => {
    const params = new URLSearchParams(location.search);

    for (let key in searchParams) {
      if (sParams[key]) {
        params.set(key, sParams[key])
      } else {
        params.delete(key)
      }
    }

    history.push({search: params.toString()});
  }

  //
  const validateSearchForm = () => {
    return searchParams.search !== '' || searchParams.brand !== '' || searchParams.name !== '' || searchParams.barcode !== '' || searchParams.manufacturer !== '';
  }

  return (
    <div>
      <ProductSearchForm params={searchParams} onSearchSubmit={onSearchSubmit} onSearchChange={updateSearchParams} />
      <ProductList products={products} />
      {products && products.length > 0 && (<Pagination page={searchParams.page} itemsOnPage={products.length} handlePageChange={updatePage} />)}
    </div>
  );
}

export default Catalog;

// jest enzym / shallow randering
// host client wihtin express


//// DONE