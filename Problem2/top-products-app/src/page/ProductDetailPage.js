import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import productService from '../services/productService';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productService.getProductById(productId).then((data) => {
      setProduct(data);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body1">
        Company: {product.company} | Category: {product.category}
      </Typography>
      <Typography variant="body1">
        Price: ${product.price} | Rating: {product.rating} | Discount: {product.discount}% | Available: {product.available ? 'Yes' : 'No'}
      </Typography>
    </Container>
  );
};

export default ProductDetailPage;
