import { prisma } from "@/lib/prisma";

export default async function Section() {
  const [products, blogs, banners] = await Promise.all([
    prisma.affiliateProduct.findMany({
      take: 5,
      orderBy: { aw_product_id: "desc" },
      // Removed the invalid 'where' clause with status field
    }),
    prisma.blog.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      // Only include published: true if your Blog model has this field
    }),
    prisma.banner.findMany({
      take: 1,
      orderBy: { id: "desc" },
      // Only include active: true if your Banner model has this field
    }),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Latest Products & Insights",
    description:
      "Discover trending affiliate products and expert blog insights",
    mainEntity: [
      ...blogs.map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt || blog.content.slice(0, 160),
        author: { "@type": "Person", name: blog.author },
        datePublished: blog.createdAt,
        image: blog.coverImage,
      })),
      ...products.map((product) => ({
        "@type": "Product",
        name: product.product_name,
        price: product.display_price,
        image: product.merchant_image_url,
      })),
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-25 px-4 py-16 space-y-20'>
        {/* Featured Blogs with Modern Card Design */}
        <section aria-labelledby='blog-heading' className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <h2
                id='blog-heading'
                className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                Latest Insights
              </h2>
              <p className='text-gray-600'>
                Expert articles to keep you informed
              </p>
            </div>
            <a
              href='/blog'
              className='text-blue-600 hover:text-blue-700 font-semibold text-sm uppercase tracking-wide transition-colors'>
              View All →
            </a>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className='group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100'>
                <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0'></div>

                <figure className='relative overflow-hidden h-48'>
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                      <span className='text-white text-2xl font-bold'>📝</span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
                </figure>

                <div className='relative z-10 p-6'>
                  <div className='flex items-center gap-2 text-xs text-gray-500 mb-3'>
                    <span className='font-medium text-blue-600'>
                      {blog.author}
                    </span>
                    <span>•</span>
                    <time
                      dateTime={new Date(blog.createdAt).toISOString()}
                      className='font-medium'>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                    {blog.title}
                  </h3>

                  <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {blog.excerpt || blog.content.slice(0, 120) + "..."}
                  </p>

                  <a
                    href={`/blog/${blog.slug || blog.id}`}
                    className='inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-300'>
                    Read More
                    <svg
                      className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Products Grid with Modern Design */}
        <section
          aria-labelledby='products-heading'
          className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2
              id='products-heading'
              className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
              Trending Products
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Handpicked products that are making waves right now
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {products.map((product, index) => (
              <article
                key={product.id}
                className='group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 border border-gray-100 hover:border-blue-200'>
                <div className='relative mb-4 flex justify-center items-center h-32 bg-gray-50 rounded-lg overflow-hidden'>
                  {product.merchant_image_url ? (
                    <img
                      src={product.merchant_image_url}
                      alt={product.product_name}
                      className='max-h-20 max-w-full object-contain transition-transform group-hover:scale-105 duration-300'
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg'>
                      <span className='text-2xl'>🛒</span>
                    </div>
                  )}
                  <div className='absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                    New
                  </div>
                </div>

                <h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2 text-center group-hover:text-blue-600 transition-colors'>
                  {product.product_name}
                </h3>

                <p className='text-lg font-bold text-blue-600 text-center mb-4'>
                  {product.display_price}
                </p>

                <a
                  href={product.merchant_deep_link || "#"}
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  className='block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-sm font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                  Shop Now
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Promotional Banner with CTA */}
        <section aria-label='Promotional Banner' className='max-w-7xl mx-auto'>
          {banners.map((banner) => (
            <figure
              key={banner.id}
              className='relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group'>
              {banner.imageUrl ? (
                <>
                  <img
                    src={banner.imageUrl}
                    alt={banner.altText || "Special Promotion"}
                    className='w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700'
                    loading='eager'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent'></div>
                </>
              ) : (
                <div className='w-full h-64 md:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center'>
                  <div className='text-center text-white p-8'>
                    <h3 className='text-3xl font-bold mb-2'>
                      Special Promotion
                    </h3>
                    <p className='text-xl opacity-90'>
                      Limited time offers available
                    </p>
                  </div>
                </div>
              )}

              <figcaption className='absolute bottom-8 left-8 text-white max-w-md'>
                <h3 className='text-2xl md:text-3xl font-bold mb-2'>
                  {banner.title || "Special Offer"}
                </h3>
                <p className='text-lg opacity-90 mb-4'>
                  {banner.description ||
                    "Don't miss out on this amazing opportunity"}
                </p>
                <button className='bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300'>
                  Learn More
                </button>
              </figcaption>
            </figure>
          ))}
        </section>
      </main>
    </>
  );
}
