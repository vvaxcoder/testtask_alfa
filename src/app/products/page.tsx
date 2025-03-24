'use client'

import { create } from 'zustand';
import { Card, Button, Input, Pagination, Switch } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";

import '@ant-design/v5-patch-for-react-19';

import '../style.css';

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
  }))
}));

export default function Products() {
  const { favorites, products, fetchProducts, toggleFavorite, removeProduct } = useProductStore();
  const [filterFavs, setFilterFavs] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products
    .filter(p => !filterFavs || favorites.has(p.id))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 20 }}>
      <Input.Search placeholder="Поиск..." onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 20 }} />

      <Switch checked={filterFavs} onChange={setFilterFavs} checkedChildren="Избранное" unCheckedChildren="Все" style={{ marginBottom: 20 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20, padding: '0 30px' }}>
        {filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((p) => (
          <Card key={p.id} hoverable
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            cover={<Image
            src={p.image}
            height={150}
            width={150}
            alt={p.title}
            />}>

            <Link href={`/products/${p.id}`} passHref>
              <div style={{ minHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <Button icon={favorites.has(p.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={() => toggleFavorite(p.id)} />
              <Button icon={<DeleteOutlined />} onClick={() => removeProduct(p.id)} danger />
            </div>
          </Card>
        ))}
      </div>

      <Pagination current={page} total={filteredProducts.length} pageSize={itemsPerPage} onChange={setPage} style={{ marginTop: 20, textAlign: 'center' }} />
    </div>
  );
}
