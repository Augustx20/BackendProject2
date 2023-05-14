const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromJSON();
    const newProduct = {
      id: this.generateId(products),
      ...product
    };
    products.push(newProduct);
    this.saveProductsToJSON(products);
    return newProduct;
  }

  getProducts() {
    return this.getProductsFromJSON();
  }

  getProductById(id) {
    const products = this.getProductsFromJSON();
    const product = products.find((product) => product.id === id);
    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromJSON();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields
      };
      products[productIndex] = updatedProduct;
      this.saveProductsToJSON(products);
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProductsFromJSON();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];
      this.saveProductsToJSON(products);
      return deletedProduct;
    }
    return null;
  }

  generateId(products) {
    if (products.length === 0) {
      return 1;
    }
    const lastProduct = products[products.length - 1];
    return lastProduct.id + 1;
  }

  getProductsFromJSON() {
    const fileData = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(fileData);
  }

  saveProductsToJSON(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }
}

// Ejemplo de uso:

const productManager = new ProductManager('products.json');

const newProduct = {
  title: 'Nuevo producto',
  description: 'Descripción del nuevo producto',
  price: 100,
  thumbnail: 'imagen_del_nuevo_producto.jpg',
  code: '123456',
  stock: 10
};

productManager.addProduct(newProduct);

const allProducts = productManager.getProducts();
console.log(allProducts);

const productId = 1;
const product = productManager.getProductById(productId);
console.log(product);

const updatedFields = {
  title: 'Producto actualizado',
  price: 200
};

const updatedProduct = productManager.updateProduct(productId, updatedFields);
console.log(updatedProduct);

const deletedProduct = productManager.deleteProduct(productId);
console.log(deletedProduct);