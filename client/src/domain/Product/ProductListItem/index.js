import React from 'react';
import PropTypes from 'prop-types';

import './style.css'

const ProductListItem = ({product}) => {

  const { images, barcode_number, product_name, brand, description} = product;

  return (<li className="product-list-item">
    <span className="product-list-item-prop image">{images && images.length ? (<img src={images[0]} />) : ''}</span>
    <span className="product-list-item-prop barcode">{ barcode_number }</span>
    <span className="product-list-item-prop name">{ product_name }</span>
    <span className="product-list-item-prop brand">{ brand }</span>
    {/*<span className="product-list-item-prop color">{ color }</span>*/}
    <span className="product-list-item-prop description"><div dangerouslySetInnerHTML={{ __html: description }} /></span>
  </li>);
};

// prop types
ProductListItem.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.array,
    barcode_number: PropTypes.string,
    product_name: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string
  })
};

export default ProductListItem;