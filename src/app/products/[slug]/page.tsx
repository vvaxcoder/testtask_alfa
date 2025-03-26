'use client';

import { Card, Button } from 'antd';
import { useRouter } from "next/navigation";

import { useProductStore } from '@/app/store/ProductStore';
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductPage() {
  const router = useRouter();
  const { products } = useProductStore();
  const params = useParams();
  const { slug: id } = params;
  const product = products.find((p: { id: number; }) => p.id === Number(id));

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
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </Card>
      </div>
    </div>
  );
}