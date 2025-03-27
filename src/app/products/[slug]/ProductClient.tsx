'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Card, Spin } from "antd";
import '@ant-design/v5-patch-for-react-19';

import Product from "@/app/types/Product";

export default function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) {
        setLoading(true);
    }
    else {
        setLoading(false);
    }
  }, [product]);

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