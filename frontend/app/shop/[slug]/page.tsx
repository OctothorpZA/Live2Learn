import { client } from '@/sanity/lib/client'
import { allProductsQuery, singleProductQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import PortableText from '@/app/components/PortableText'
import ProductImage from '@/app/components/shop/ProductImage' // Import the new client component

// Define the interface for a single product for type safety
interface Product {
  _id: string
  productName?: string
  slug?: string
  image?: string
  price?: number
  description?: any // Portable Text content
}

// This function generates the static paths for all products at build time
export async function generateStaticParams() {
  const products: Product[] = await client.fetch(allProductsQuery)
  // A more robust filter to ensure product and product.slug are valid before mapping
  return products
    .filter((product) => product?.slug)
    .map((product) => ({
      slug: product.slug,
    }))
}

/**
 * The product detail page.
 * It fetches and displays all information for a single product.
 * @param {object} params Contains the slug of the product to display.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const product: Product = await client.fetch(singleProductQuery, { slug })

  // If no product is found for the given slug, show a 404 page
  if (!product) {
    notFound()
  }

  // Destructure for easier access, providing default values
  const {
    productName = 'Untitled Product',
    image = 'https://placehold.co/1200x800/EEE/31343C?text=No+Image', // Placeholder
    price = 0.0,
    description,
  } = product

  // Format the price into a currency string
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

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
                <PortableText value={description} />
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
