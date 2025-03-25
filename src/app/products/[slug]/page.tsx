'use client'

import { create } from 'zustand';
import { Card, Button } from 'antd';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface ProductStore {
  products: Product[];
  favorites: Set<number>;
  fetchProducts: () => Promise<void>;
  toggleFavorite: (id: number) => void;
  removeProduct: (id: number) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  favorites: new Set(),
  fetchProducts: async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await res.json();
    set({ products: data });
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
    products: [{ ...product, id: Date.now() }, ...state.products]
  })),
}));

export default function ProductPage() {
    const { products } = useProductStore();
    const parameter = useSearchParams();
    const id = parameter.get("id");
    const product = products.find((p: { id: number; }) => p.id === Number(id));
  
    if (!product) return <p>Продукт не найден</p>;
  
    return (
      <div style={{ padding: 20 }}>
        <Button onClick={() => router.push('/products')} style={{ marginBottom: 20 }}>Назад к списку</Button>
        <Card cover={<img src={product.image} alt={product.title} style={{ height: 300, objectFit: 'cover' }} />}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </Card>
      </div>
    );
  }