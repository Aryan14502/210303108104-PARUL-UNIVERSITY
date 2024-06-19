import api from '../utils/api';

const productService = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
};

export default productService;
