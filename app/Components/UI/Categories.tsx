"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: string[]) => setCategories(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (categories.length === 0) return <p>No categories found.</p>;

  return (
    <div className='flex flex-wrap gap-4'>
      {categories.map((cat) => (
        <button
          key={cat}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => router.push(`/category/${encodeURIComponent(cat)}`)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
