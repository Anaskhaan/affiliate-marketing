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
      className='group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-300'
      onClick={() => router.push(`/product/${id}`)}>
      {/* Product Image */}
      <div className='relative w-full h-48 flex items-center justify-center bg-gray-50 overflow-hidden rounded-t-2xl'>
        {merchant_image_url ? (
          <img
            src={merchant_image_url}
            alt={product_name || "Product"}
            className='max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-t-2xl'>
            <span className='text-3xl'>🛒</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-4 flex flex-col justify-between h-40'>
        <h3 className='text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {product_name}
        </h3>

        <p className='text-lg font-bold text-blue-600 mb-3'>
          {display_price || store_price || "Price not available"}
        </p>

        {/* Shop Now Button */}
        <div className='mt-auto'>
          <button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105'>
            Shop Now
          </button>
        </div>
      </div>

      {/* Optional Ribbon / Tag */}
      <div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow'>
        New
      </div>
    </div>
  );
}
