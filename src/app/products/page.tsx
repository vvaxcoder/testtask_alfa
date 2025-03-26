'use client';

import { Card, Button, Input, Pagination, Switch, Typography } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from "next/navigation";
import '@ant-design/v5-patch-for-react-19';

import '../style.css';

import { useProductStore } from '../store/ProductStore';

export default function Products() {
  const router = useRouter();
  const { 
    favorites,
    products,
    fetchProducts,
    toggleFavorite,
    removeProduct,
  } = useProductStore();
  const [filterFavs, setFilterFavs] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  const filteredProducts = products
    .filter(p => !filterFavs || favorites.has(p.id))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const createProduct = () => {
    router.push('/create-product');
  };

  return (
    <div style={{ padding: 20 }}>
      <Input.Search placeholder="Поиск..." onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 20 }} />

      <Switch checked={filterFavs} onChange={setFilterFavs} checkedChildren="Избранное" unCheckedChildren="Все" style={{ marginBottom: 20 }} />

      <Button type="primary" icon={<PlusOutlined />} onClick={() => createProduct()} style={{ marginBottom: 2, float: 'right' }}>
        Добавить новый продукт
      </Button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20, padding: '0 30px' }}>
        {filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} passHref>
            <Card hoverable
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              cover={<Image
              src={p.image}
              height={150}
              width={150}
              alt={p.title}
              />}>
                <div style={{ minHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                </div>
                <Typography.Text ellipsis style={{ minHeight: 50, width: 240, display: "block" }}>
                  {p.title}
                </Typography.Text>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  <Button icon={favorites.has(p.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={() => toggleFavorite(p.id)} />
                  <Button icon={<DeleteOutlined />} onClick={() => removeProduct(p.id)} danger />
                </div>
            </Card>
          </Link>
        ))}
      </div>

      <Pagination current={page} total={filteredProducts.length} pageSize={itemsPerPage} onChange={setPage} style={{ marginTop: 20, textAlign: 'center' }} />
    </div>
  );
}
