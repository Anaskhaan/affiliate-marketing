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
  merchant_deep_link: string | null;
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

  if (loading) return <p className='text-center py-20'>Loading product...</p>;
  if (!product) return <p className='text-center py-20'>Product not found.</p>;

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-12'>
      {/* Product Header */}
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 text-center'>
        {product.product_name}
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image */}
        <div className='relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500'>
          <img
            src={product.merchant_image_url || "/placeholder.png"}
            alt={product.product_name || "Product"}
            className='w-full h-96 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute top-4 right-4 bg-blue-600 text-white font-semibold px-3 py-1 rounded-full shadow'>
            {product.display_price || product.store_price || "N/A"}
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col justify-between space-y-6'>
          {/* Description */}
          {product.description && (
            <p className='text-gray-700 text-lg leading-relaxed'>
              {product.description}
            </p>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <h2 className='font-semibold text-gray-800 mb-2'>
                Specifications:
              </h2>
              <p className='text-gray-700 text-sm'>{product.specifications}</p>
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <p className='text-gray-600'>Dimensions: {product.dimensions}</p>
          )}

          {/* Buy Button */}
          <a
            href={product.merchant_deep_link || "#"}
            target='_blank'
            rel='noopener noreferrer nofollow'
            className='mt-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl'>
            Buy Now
          </a>
        </div>
      </div>

      {/* Additional Info Section */}
      <section className='bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm'>
        <h3 className='text-xl font-semibold mb-4'>More About This Product</h3>
        <p className='text-gray-700 leading-relaxed'>
          Here you can add additional product info, reviews, or marketing
          highlights.
        </p>
      </section>
    </div>
  );
}
