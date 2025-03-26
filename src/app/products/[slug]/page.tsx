'use client';

import { Card, Button, Spin } from 'antd';
import { useRouter } from "next/navigation";

import { useProductStore } from '@/app/store/ProductStore';
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from 'react';

import Product from '@/app/types/Product';

export default function ProductPage() {
  const router = useRouter();
  const { products } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { slug: id } = params;

  useEffect(() => {
    const existingProduct = products.find((p) => p.id === Number(id));

    if (existingProduct) {
      setProduct(existingProduct);
      setLoading(false);
    } else {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    }
  }, [id, products]);

  if (loading) return <Spin size="large" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;

  if (!product) return <p>Продукт не найден</p>;

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => router.push('/products')} style={{ marginBottom: 20 }}>Назад к списку</Button>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Card
          style={{
            width: 400,
            height: 300,
            textAlign: "center",
          }}
          cover={
            <Image
              src={product.image}
              alt={product.title}
              height={300}
              width={400}
              style={{ objectFit: 'contain' }} />
          }>
          <h1 style={{ margin: '10px 0', fontSize: '18px' }}>{product.title}</h1>

          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', marginTop: 6, marginBottom: 6 }}>
            <span>Price:</span>
            <span></span>
            <span></span>
            <span>{product.price}</span>
          </div>

          <p style={{ textAlign: 'start' }}>{product.description}</p>
        </Card>
      </div>
    </div>
  );
}