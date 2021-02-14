const { default: axios } = require('axios');
const path = require('path');
const express = require('express');

const app = express();

const API_KEY = '2ygfrn4kpn63zw2ev947xsuwx4jk4a';//'g4escxmuy5by3ob91535pnpq0deuz4';

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const url = "https://api.barcodelookup.com/v2/products";
app.get('/api/products', (req, res) => {
  const qParams = req.query;
  const searchParams = {
    formatted: 'y',
    key: API_KEY,
    ...getSearchParams(qParams),
    page: parseInt(qParams.page) || 1
  };

  axios.get(url, {
    params: searchParams
  })
  .then(response => response.data)
  .then(data => data.products)
  .then(products => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ products }));
  })
  .catch(function (error) {
    console.log('error', error.response.status);
    res.setHeader('Content-Type', 'application/json');
    res.status(error.response.status);
    res.send(JSON.stringify({ 
      status: error.response.status,
      message: error.response.statusText
     }));
  })
  /*.then(function () {
    // always executed
  }); */
  //res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify(searchParams));
});

function getSearchParams(params) {
  const searchParams = {};
  if( params.hasOwnProperty('search') && params.search.length ) {
    searchParams.search = params.search;
  }
  if( params.hasOwnProperty('name') && params.name.length ) {
    searchParams['product-name'] = params.name;
  }
  if( params.hasOwnProperty('manufacturer') && params.manufacturer.length ) {
    searchParams.manufacturer = params.manufacturer;
  }
  if( params.hasOwnProperty('brand') && params.brand.length ) {
    searchParams.brand = params.brand;
  }
  if( params.hasOwnProperty('barcode') && params.barcode.length ) {
    searchParams.barcode = params.barcode;
  }

  return searchParams;
}

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log('Express server is running on localhost:' + port)
);