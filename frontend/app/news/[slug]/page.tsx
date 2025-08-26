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

type PageProps = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * This tells Next.js which post pages to pre-build at build time.
 */
export async function generateStaticParams() {
  // FIX: Removed the incorrect generic type from sanityFetch.
  // The return type will be correctly inferred from the postPagesSlugs query.
  const { data: slugs } = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })

  // The query `postPagesSlugs` already returns the data in the format
  // required by `generateStaticParams`: `Array<{ slug: string }>`
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
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data: post } = await sanityFetch({
    query: singlePostQuery,
    params,
    stega: false,
  })

  return {
    title: post?.title || 'News & Stories',
    description: post?.excerpt || 'A post from Living Through Learning.',
  }
}

export default async function PostPage({ params: paramsPromise }: PageProps) {
  // FIX: Await the params promise to get the resolved value.
  const params = await paramsPromise
  // FIX: Removed the incorrect generic type from sanityFetch.
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
            <div className="mb-8 sm:mx-0 md:mb-16">
              <CoverImage
                image={post.coverImage}
                // alt={`Cover image for ${post.title}`}
                // className="w-full rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-blue mx-auto max-w-2xl">
            {post.content ? (
              // FIX: Use a type assertion to match the expected PortableTextBlock[] type.
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
