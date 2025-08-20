import { client } from '@/sanity/lib/client'
import { allProductsQuery } from '@/sanity/lib/queries'
import ProductCard from '../components/shop/ProductCard'

// Define the interface for a single product to ensure type safety
interface Product {
  _id: string
  productName?: string
  slug?: string
  image?: string
  price?: number
}

/**
 * The main shop page that displays a gallery of all products.
 * This page fetches all product data from Sanity and renders a ProductCard for each.
 */
export default async function ShopPage() {
  // Fetch all products using the Sanity client and the GROQ query
  const products: Product[] = await client.fetch(allProductsQuery)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            LTL Shop
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Support our mission with every purchase.
          </p>
        </header>

        <main>
          {/* A responsive grid for the product cards.
            - 1 column on small screens (default)
            - 2 columns on medium screens (md)
            - 3 columns on large screens (lg)
            - 4 columns on extra-large screens (xl)
          */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
