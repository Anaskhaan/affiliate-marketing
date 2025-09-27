"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface AffiliateProduct {
  id: number;
  product_name: string | null;
  merchant_image_url: string | null;
  display_price: string | null;
  store_price: number | null;
  description: string | null;
  specifications: string | null;
  dimensions: string | null;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<AffiliateProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data: AffiliateProduct) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>{product.product_name}</h1>

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <img
            src={product.merchant_image_url || "/placeholder.png"}
            alt={product.product_name || "Product"}
            className='w-full h-80 object-cover rounded'
          />
        </div>

        <div>
          <p className='text-lg mb-2'>
            Price: {product.display_price || product.store_price || "N/A"}
          </p>
          {product.description && <p className='mb-2'>{product.description}</p>}
          {product.specifications && (
            <div className='mb-2'>
              <h3 className='font-medium'>Specifications:</h3>
              <p>{product.specifications}</p>
            </div>
          )}
          {product.dimensions && <p>Dimensions: {product.dimensions}</p>}
        </div>
      </div>
    </div>
  );
}
