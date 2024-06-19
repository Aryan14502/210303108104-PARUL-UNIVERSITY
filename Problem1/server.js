const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/categories/:categoryname/products', async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { top, minPrice, maxPrice, sort, order, page } = req.query;
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const requests = companies.map(company => axios.get(`http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`, { params: { top, minPrice, maxPrice } }));

    const responses = await Promise.all(requests);
    let combinedProducts = [];
    responses.forEach(response => combinedProducts = combinedProducts.concat(response.data.products));

    if (sort && ['rating', 'price', 'company', 'discount'].includes(sort)) {
      combinedProducts.sort((a, b) => {
        const aValue = a[sort];
        const bValue = b[sort];
        return order === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }

    let resultProducts = combinedProducts.slice(0, top);
    if (page && top > 10) {
      const startIndex = (page - 1) * top;
      resultProducts = combinedProducts.slice(startIndex, startIndex + top);
    }

    resultProducts.forEach((product, index) => product.id = `${categoryname}-${index + 1}`);

    res.json(resultProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  try {
    const { categoryname, productid } = req.params;
    const index = parseInt(productid.split('-')[1]) - 1;
    const { top, minPrice, maxPrice } = req.query;
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const requests = companies.map(company => axios.get(`http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`, { params: { top, minPrice, maxPrice } }));

    const responses = await Promise.all(requests);
    let productDetails;

    responses.find(response => {
      const products = response.data.products;
      const foundProduct = products.find((product, idx) => idx === index);
      if (foundProduct) {
        productDetails = foundProduct;
        return true;
      }
      return false;
    });

    if (productDetails) {
      res.json(productDetails);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
