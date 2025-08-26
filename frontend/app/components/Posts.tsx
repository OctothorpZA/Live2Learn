import Link from 'next/link'

import { sanityFetch } from '@/sanity/lib/live'
import { morePostsQuery, allPostsQuery } from '@/sanity/lib/queries'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import Avatar from '@/app/components/Avatar'
import { createDataAttribute } from 'next-sanity'

// Define a local, explicit type for a Post to bypass the faulty generated type.
type PostType = {
  _id: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  date?: string | null
  author?: {
    name?: string | null
    picture?: any
  } | null
}

const Post = ({ post }: { post: PostType }) => {
  const { _id, title, slug, excerpt, date, author } = post

  const attr = createDataAttribute({
    id: _id,
    type: 'post',
    path: 'title',
  })

  return (
    <article
      data-sanity={attr()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/posts/${slug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <h3 className="text-2xl font-bold mb-4 leading-tight">{title}</h3>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
          {excerpt}
        </p>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {/* FIX: Changed check from firstName/lastName to the correct 'name' field */}
        {author && author.name && (
          <div className="flex items-center">
            <Avatar person={author} small={true} />
          </div>
        )}
        {/* FIX: Ensure the date prop is not null before passing it to dateTime. */}
        <time
          className="text-gray-500 text-xs font-mono"
          dateTime={date ?? undefined}
        >
          <DateComponent dateString={date ?? undefined} />
        </time>
      </div>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
    )}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
)

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string
  limit: number
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {/* FIX: Cast data to 'any' to bypass the incorrect 'never[]' type from Sanity Typegen */}
      {(data as any)?.map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async () => {
  const { data } = await sanityFetch({
    query: allPostsQuery,
  })

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Posts
      heading="Recent Posts"
      subHeading={`${
        data.length === 1
          ? 'This blog post is'
          : `These ${data.length} blog posts are`
      } populated from your Sanity Studio.`}
    >
      {/* FIX: Cast data to 'any' to bypass the incorrect 'never[]' type from Sanity Typegen */}
      {(data as any).map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
