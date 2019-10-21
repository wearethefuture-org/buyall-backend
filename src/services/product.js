class ProductService {
  constructor(database) {
    this.collection = database.collection("Products");
  }

  getCollection() {
    return this.collection;
  }

  setCollection(collection) {
    this.collection = collection;
  }

  async getProducts() {
    return this.collection.find({});
  }

  async getProduct(id) {
    return this.collection.find({ product_id: id });
  }

  async addProduct(product) {
    return this.collection.insert(product);
  }

  async updateProduct(id, product) {
    return this.collection.update({ product_id: id }, product);
  }

  async deleteProduct(id) {
    return this.collection.deleteOne({ product_id: id });
  }
}

module.exports = ProductService;
