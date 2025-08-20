// frontend/app/news/page.tsx

import { client } from '@/sanity/lib/client'
import { allPostsQuery, type Post } from '@/sanity/lib/queries'
import PostCard from '@/app/components/news/PostCard'

export default async function NewsPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery)

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

        {posts?.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
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
