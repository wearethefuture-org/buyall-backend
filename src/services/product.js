function Product() {
  let collection = null;

  this.setCollection = newCollection => {
    collection = newCollection;
  };

  this.getProducts = async () => {
    return collection.find({});
  };

  this.getProduct = async id => {
    return collection.find({ product_id: id });
  };

  this.addProduct = async product => {
    return collection.insert(product);
  };

  this.updateProduct = async (id, product) => {
    return collection.update({ product_id: id }, product);
  };

  this.deleteProduct = async id => {
    return collection.deleteOne({ product_id: id });
  };
}

const product = new Product();

module.exports = product;
