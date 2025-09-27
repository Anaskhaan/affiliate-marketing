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
  sub_category: string | null;
}

export default function CategoryPage() {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch subcategories
  useEffect(() => {
    fetch(`/api/subcategories/${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data: string[]) => setSubcategories(data))
      .finally(() => setLoadingSubs(false));
  }, [category]);

  // Fetch products (optionally filtered by subcategory)
  useEffect(() => {
    const url = selectedSubcategory
      ? `/api/products/${encodeURIComponent(category)}?sub=${encodeURIComponent(
          selectedSubcategory
        )}`
      : `/api/products/${encodeURIComponent(category)}`;

    setLoadingProducts(true);
    fetch(url)
      .then((res) => res.json())
      .then((data: AffiliateProduct[]) => setProducts(data))
      .finally(() => setLoadingProducts(false));
  }, [category, selectedSubcategory]);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Category: {category}</h1>

      {/* Subcategories row */}
      {loadingSubs ? (
        <p>Loading subcategories...</p>
      ) : subcategories.length === 0 ? null : (
        <div className='flex flex-wrap gap-3 mb-6'>
          {subcategories.map((sub) => (
            <button
              key={sub}
              className={`px-3 py-1 rounded text-white ${
                selectedSubcategory === sub
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() =>
                setSelectedSubcategory(selectedSubcategory === sub ? null : sub)
              }>
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Products */}
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
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
