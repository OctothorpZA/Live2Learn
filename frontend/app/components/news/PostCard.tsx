// frontend/app/components/news/PostCard.tsx

import Link from 'next/link'
import type { Post } from '@/sanity/lib/queries'
import CoverImage from '@/app/components/CoverImage'
import DateComponent from '@/app/components/Date'

export default function PostCard({
  title,
  slug,
  coverImage,
  date,
  excerpt,
}: Pick<Post, 'title' | 'slug' | 'coverImage' | 'date' | 'excerpt'>) {
  return (
    <Link href={`/news/${slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
        <div className="relative">
          <CoverImage
            image={coverImage}
            alt={`Cover image for ${title}`}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold leading-tight text-ltl-blue-900 transition-colors duration-300 group-hover:text-ltl-orange-500">
            {title}
          </h3>
          <div className="mb-4 text-sm text-gray-500">
            <DateComponent dateString={date} />
          </div>
          <p className="text-base text-gray-700">{excerpt}</p>
        </div>
      </div>
    </Link>
  )
}
