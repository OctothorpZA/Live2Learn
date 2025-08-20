import Link from 'next/link'
import ProductImage from './ProductImage' // Import the new client component

// Define the props interface for type safety
interface ProductCardProps {
  product: {
    _id: string
    productName?: string
    slug?: string
    image?: string
    price?: number
  }
}

/**
 * A reusable component to display a single product in a grid.
 * It shows the product's image, name, and price, and links to the product's detail page.
 * @param {ProductCardProps} props The product data to display.
 */
export default function ProductCard({ product }: ProductCardProps) {
  // Destructure for easier access, providing default values
  const {
    productName = 'Untitled Product',
    slug = '',
    image = 'https://placehold.co/600x400/EEE/31343C?text=No+Image', // Placeholder image
    price = 0.0,
  } = product

  // Format the price to a currency string (e.g., $12.34)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // You can change this to your desired currency
  }).format(price)

  return (
    <Link
      href={`/shop/${slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg dark:border-gray-700"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <ProductImage
          src={image}
          alt={`Cover image for ${productName}`}
          className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          layout="fill"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font.semibold text-gray-800 dark:text-white">
          {productName}
        </h3>
        <p className="mt-2 text-md font-medium text-gray-600 dark:text-gray-300">
          {formattedPrice}
        </p>
      </div>
    </Link>
  )
}
