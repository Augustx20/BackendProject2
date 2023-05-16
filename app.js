const express = require('express');
const ProductManager = require('./productManager')

const app = express();
const productManager = new ProductManager('products.json');

app.set('json spaces', 2);

// Obtener todos los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});