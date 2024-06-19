import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Company: {product.company} | Category: {product.category}
        </Typography>
        <Typography variant="body2">
          Price: ${product.price} | Rating: {product.rating} | Discount: {product.discount}% | Available: {product.available ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
