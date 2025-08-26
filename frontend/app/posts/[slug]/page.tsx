import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, singlePostQuery } from '@/sanity/lib/queries'
// FIX: The 'Post' type is imported from the auto-generated sanity.types.ts file
import type { Post } from '@/sanity.types'

// FIX: The type for params is now a Promise, aligning with Next.js 15.
type PageProps = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 */
export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })

  return slugs || []
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  // FIX: Await the params promise to get the resolved value.
  const params = await paramsPromise
  const { data: post } = await sanityFetch({
    query: singlePostQuery,
    params,
    stega: false,
  })

  return {
    title: post?.title || 'Post',
    description: post?.excerpt || 'A post from Living Through Learning.',
  }
}

export default async function PostPage({ params: paramsPromise }: PageProps) {
  // FIX: Await the params promise to get the resolved value.
  const params = await paramsPromise
  const { data: post } = await sanityFetch({
    query: singlePostQuery,
    params,
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
            // FIX: Moved className to the parent div as CoverImage does not accept it.
            <div className="mb-8 sm:mx-0 md:mb-16 w-full rounded-lg shadow-lg overflow-hidden">
              <CoverImage image={post.coverImage} priority />
            </div>
          )}

          <div className="prose prose-lg prose-blue mx-auto max-w-2xl">
            {post.content ? (
              <PortableText value={post.content as PortableTextBlock[]} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
