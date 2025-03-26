import { create } from "zustand";
import ProductStore from "../types/ProductStore";
import Product from "../types/Product";

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    favorites: new Set(),
    fetchProducts: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await res.json();
      set((state) => ({
        products: state.products.length === 0 ? state.products = data : state.products,
      }));
    },
    toggleFavorite: (id: number) => set((state) => {
      const newFavorites = new Set<number>(state.favorites);
  
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
  
      return { favorites: newFavorites };
    }),
    removeProduct: (id) => set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    })),
    addProduct: (product: Product) => set((state) => ({
      products: [...state.products, { ...product, id: Date.now() }]
    })),
  }));
