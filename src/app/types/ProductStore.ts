import Product from "./Product";

interface ProductStore {
  products: Product[];
  favorites: Set<number>;
  fetchProducts: () => Promise<void>;
  toggleFavorite: (id: number) => void;
  removeProduct: (id: number) => void;
  addProduct: (product: Product) => void;
}

export default ProductStore;