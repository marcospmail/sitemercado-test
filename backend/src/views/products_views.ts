import Product from "../models/Product"

const productView = {
  render(product?: Product) {
    if (!product) return {}

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      path: product.path ? `http://localhost:3333/uploads/${product.path}` : null
    }
  },

  renderMany(products?: Product[]) {
    if (!products) return []

    return products.map(product => this.render(product))
  }
}

export default productView