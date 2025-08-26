import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import ProductImage from '@/app/components/shop/ProductImage'
import { sanityFetch } from '@/sanity/lib/live'
import { allProductsQuery, singleProductQuery } from '@/sanity/lib/queries'

// FIX: Define a local, explicit type for a Product to bypass the faulty generated type.
type ProductType = {
  _id: string
  productName?: string | null
  slug?: string | null
  image?: any
  price?: number | null
  description?: any | null
}

// FIX: The type for params is now a Promise, aligning with Next.js 15.
type PageProps = {
  params: Promise<{ slug: string }>
}

// This function generates the static paths for all products at build time
export async function generateStaticParams() {
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data } = await sanityFetch({
    query: allProductsQuery,
    perspective: 'published',
    stega: false,
  })
  const products = data as ProductType[] | null

  return (products || [])
    .filter((product) => product?.slug)
    .map((product) => ({
      // FIX: Use product.slug directly as the query returns a string.
      slug: product.slug,
    }))
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
  const { data } = await sanityFetch({
    query: singleProductQuery,
    params,
    stega: false,
  })
  const product = data as ProductType | null

  return {
    title: product?.productName || 'Shop',
    description: `Details for ${product?.productName || 'product'}.`,
  }
}

/**
 * The product detail page.
 */
export default async function ProductDetailPage({
  params: paramsPromise,
}: PageProps) {
  // FIX: Await the params promise to get the resolved value.
  const params = await paramsPromise
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data } = await sanityFetch({
    query: singleProductQuery,
    params,
  })
  const product = data as ProductType | null

  // If no product is found for the given slug, show a 404 page
  if (!product) {
    notFound()
  }

  // Destructure for easier access, providing default values
  const {
    productName = 'Untitled Product',
    image,
    price,
    description,
  } = product

  // Format the price into a currency string
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // FIX: Provide a fallback of 0 if price is null or undefined to satisfy the .format() method.
  }).format(price ?? 0)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Product Image Section */}
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
            <ProductImage
              src={image}
              alt={`Image of ${productName}`}
              className="h-full w-full object-cover object-center"
              layout="fill"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {productName}
            </h1>
            <p className="mt-4 text-3xl text-gray-700 dark:text-gray-200">
              {formattedPrice}
            </p>

            {/* Product Description */}
            <div className="prose prose-lg mt-6 text-gray-600 dark:prose-invert dark:text-gray-300">
              {description ? (
                <PortableText value={description as PortableTextBlock[]} />
              ) : (
                <p>No description available.</p>
              )}
            </div>

            {/* Add to Cart Button (Placeholder) */}
            <div className="mt-10">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                // The button is disabled to indicate it's a placeholder
                disabled
              >
                Add to Cart
              </button>
              <p className="mt-2 text-center text-sm text-gray-500">
                (Cart functionality coming soon)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
