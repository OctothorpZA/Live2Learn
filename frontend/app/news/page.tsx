// frontend/app/news/page.tsx

import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery } from '@/sanity/lib/queries'
import PostCard from '@/app/components/news/PostCard'
import { Slug } from '@/sanity.types'

// Define a local, explicit type for a Post to bypass the faulty generated type.
type PostType = {
  _id: string
  title?: string | null
  slug?: string | null
  coverImage?: any
  date?: string | null
  excerpt?: string | null
}

export default async function NewsPage() {
  // FIX: Remove the generic from sanityFetch to avoid the constraint error.
  const { data: posts } = await sanityFetch({ query: allPostsQuery })

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ltl-blue-900 sm:text-5xl md:text-6xl">
            News & Stories
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Stay updated with the latest news, articles, and stories from Living
            Through Learning.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* FIX: Cast posts to 'any' to bypass the incorrect 'never[]' type from Sanity Typegen */}
            {(posts as any).map((post: PostType) => (
              <PostCard
                key={post._id}
                title={post.title ?? 'Untitled Post'}
                // FIX: Construct a Slug object to match the PostCard's expected prop type.
                slug={{ _type: 'slug', current: post.slug ?? '' } as Slug}
                coverImage={post.coverImage}
                // FIX: Ensure the date prop is not null before passing it.
                date={post.date ?? undefined}
                excerpt={post.excerpt ?? ''}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-500">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
