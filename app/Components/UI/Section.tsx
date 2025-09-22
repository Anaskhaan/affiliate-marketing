import { prisma } from "@/lib/prisma";

export default async function Section() {
  // Fetch latest 5 products
  const products = await prisma.affiliateProduct.findMany({
    take: 5,
    orderBy: { id: "desc" },
  });
  // Fetch latest 3 blogs
  const blogs = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  // Fetch banners
  const banners = await prisma.banner.findMany({
    take: 1,
    orderBy: { id: "desc" }, // latest first
  });

  return (
    <main className='min-h-screen bg-gray-100 px-6 space-y-8'>
      {/* Row 1: Heading */}
      <section>
        <h1 className='text-3xl font-bold text-gray-800'>Section Heading</h1>
      </section>

      {/* Row 2: Blog Row */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className='bg-white rounded-lg shadow p-6 flex flex-col justify-between'>
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className='rounded-md mb-4 h-40 w-full object-cover'
              />
            )}
            <h2 className='text-lg font-semibold mb-2'>{blog.title}</h2>
            <p className='text-sm text-gray-600 line-clamp-3'>
              {blog.excerpt ?? blog.content.slice(0, 100) + "..."}
            </p>
            <p className='text-xs text-gray-400 mt-2'>
              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </section>

      {/* Row 3: Products */}
      <section className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {products.map((p) => (
          <div
            key={p.id}
            className='bg-white rounded-lg shadow p-4 flex flex-col items-center'>
            <h2 className='text-sm font-semibold text-center'>
              {p.product_name}
            </h2>
            {p.merchant_image_url && (
              <img
                src={p.merchant_image_url}
                alt={p.product_name ?? "Product"}
                className='w-20 h-20 object-contain mt-2'
              />
            )}
            <p className='text-gray-600 text-sm mt-2'>{p.display_price}</p>
            <a
              href={p.merchant_deep_link ?? "#"}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline text-xs mt-2'>
              View
            </a>
          </div>
        ))}
      </section>

      {/* Row 4: Banner */}
      <section className=''>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className='bg-white rounded-lg shadow overflow-hidden'>
            {banner.imageUrl && (
              <img
                src={banner.imageUrl}
                alt='Banner'
                className='w-full h-48 object-cover'
              />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
