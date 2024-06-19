import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import ProductList from '../components/ProductList';
import productService from '../services/productService';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Container>
      <h1>All Products</h1>
      <ProductList products={products} />
    </Container>
  );
};

export default AllProductsPage;
