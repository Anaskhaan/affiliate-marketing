"use client";

import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  product_name: string | null;
  merchant_image_url: string | null;
  display_price: string | null;
  store_price: number | null;
}

export default function ProductCard({
  id,
  product_name,
  merchant_image_url,
  display_price,
  store_price,
}: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      className='border p-3 rounded shadow-sm cursor-pointer hover:shadow-lg transition'
      onClick={() => router.push(`/product/${id}`)}>
      <img
        src={merchant_image_url || "/placeholder.png"}
        alt={product_name || "Product"}
        className='w-full h-40 object-cover mb-2'
      />
      <h3 className='font-medium'>{product_name}</h3>
      <p className='text-sm text-gray-600'>
        {display_price || store_price || "Price not available"}
      </p>
    </div>
  );
}
