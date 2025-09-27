"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/Components/ProductCard";

interface AffiliateProduct {
  id: number;
  product_name: string | null;
  merchant_image_url: string | null;
  display_price: string | null;
  store_price: number | null;
}

export default function SubcategoryPage() {
  const { category, sub } = useParams();
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !sub) return;

    const url = `/api/products/${encodeURIComponent(
      category
    )}/${encodeURIComponent(sub)}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data: AffiliateProduct[]) => setProducts(data))
      .finally(() => setLoading(false));
  }, [category, sub]);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        {category} / {sub}
      </h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this subcategory.</p>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              product_name={p.product_name}
              merchant_image_url={p.merchant_image_url}
              display_price={p.display_price}
              store_price={p.store_price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
