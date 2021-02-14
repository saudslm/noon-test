import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../../components/InputText';
import Button from '../../../components/Button';

import './style.css'

const ProductSearchForm = props => {

  const { params: {
    name = '', search = '', barcode = '', brand = '', manufacturer = '' 
  } = {}, onSearchChange, onSearchSubmit} = props;

  // handle all input changes
  const handleChange = e => {
    onSearchChange({
      [e.target.name]: e.target.value
    });
  };

  // handle search form submit
  const handleSubmit = e => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div>
      <form className="product-search-form" onSubmit={handleSubmit}>
        <InputText
          onChange={handleChange}
          value={search}
          id="psf-search"
          name="search"
          label={'Search'}
          className={search.length === 0 ? 'empty' : ''}
          attr={{id: 'search'}} />

        <InputText
          onChange={handleChange}
          value={barcode}
          id="psf-barcode"
          name="barcode"
          className={barcode.length === 0 ? 'empty' : ''}
          label={'Barcode'} />

        <InputText
          onChange={handleChange}
          value={name}
          id="psf-name"
          name="name"
          className={name.length === 0 ? 'empty' : ''}
          label={'Name'} />

        <InputText
          onChange={handleChange}
          value={brand}
          id="psf-brand"
          name="brand"
          className={brand.length === 0 ? 'empty' : ''}
          label={'Brand'} />

        <InputText
          onChange={handleChange}
          value={manufacturer}
          id="psf-manufacturer"
          name="manufacturer"
          className={manufacturer.length === 0 ? 'empty' : ''}
          label={'Manufacturer'} />

        <Button type="submit" block={true}>Search</Button>
      </form>
    </div>
  );
};

// prop types
ProductSearchForm.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string,
    search: PropTypes.string,
    barcode: PropTypes.string,
    brand: PropTypes.string,
    manufacturer: PropTypes.string
  }),
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func
};


export default ProductSearchForm;