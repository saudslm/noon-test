import React from 'react';
import PropTypes from 'prop-types';

import ProductListItem from '../ProductListItem';

import './style.css';

const ProductList = props => {
  const {products} = props;

  return products && products.length ? (
    <div>
      <ul className="product-list">
        {products.map(product => {
          return <ProductListItem product={product} key={product.barcode_number} />
        })}
      </ul>
    </div>
  ) : (<div><br/><br/><center>No Products Found</center></div>);
}

// prop types
ProductList.propTypes = {
  products: PropTypes.array
};

export default React.memo(ProductList);
