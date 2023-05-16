const express = require('express');
const fs = require('fs');
const { Module } = require('module');

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

  getProducts(limit) {
    const products = this.getProductsFromJSON();
    if (limit) {
      return products.slice(0, limit);
    }
    return products;
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

module.exports = ProductManager;