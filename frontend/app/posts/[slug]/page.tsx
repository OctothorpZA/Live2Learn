// frontend/app/news/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { singlePostQuery, type Post } from '@/sanity/lib/queries'
import CoverImage from '@/app/components/CoverImage'
import DateComponent from '@/app/components/Date'
import Avatar from '@/app/components/Avatar'
import PortableText from '@/app/components/PortableText'

// CORRECTED: Updated the Props type to be compatible with Next.js PageProps
type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({ params }: Props) {
  const post = await client.fetch<Post | null>(singlePostQuery, {
    slug: params.slug,
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header>
            <h1 className="mb-4 text-center text-4xl font-extrabold leading-tight text-ltl-blue-900 md:text-5xl">
              {post.title}
            </h1>
            <div className="mb-8 flex items-center justify-center space-x-4 text-lg text-gray-600">
              {post.author && <Avatar person={post.author} date={post.date} />}
            </div>
          </header>

          {post.coverImage && (
            <div className="mb-8 sm:mx-0 md:mb-16">
              <CoverImage
                image={post.coverImage}
                alt={`Cover image for ${post.title}`}
                className="w-full rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-blue mx-auto max-w-2xl">
            {post.content ? (
              <PortableText value={post.content} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
