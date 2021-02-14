import React from 'react';
import * as axios from "axios";

export const searchProducts = (params) => {
  return axios.get('/api/products', { params })
  .then(response => response.data)
  .then(data => data.products);
};

export default {
  searchProducts
};