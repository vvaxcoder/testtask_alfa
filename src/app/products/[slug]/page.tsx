
import { notFound } from "next/navigation";

import Product from '@/app/types/Product';
import ProductClient from './ProductClient';

export default async function ProductPage({ params }: { params: Record<string, string> }) {
  // const { slug } = await params;
  if (!params.slug) return notFound(); 

  const product = await fetch(`https://fakestoreapi.com/products/${params.slug}`)
    .then((res) => res.ok ? res.json() : null)
    .catch(() => null);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}

export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
 
  return products.map((product: Product) => ({
    slug: product.id.toString(),
  }))
}