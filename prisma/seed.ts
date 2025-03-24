import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'Nike Dunk Low Red',
    slug: 'nike-dunk-low-red',
    brand: 'Nike',
    rating: 4.9,
    reviews: 123,
    originalPrice: 180.00,
    discountedPrice: 145.00
  },
  {
    name: 'Adidas Ultraboost 22',
    slug: 'adidas-ultraboost-22',
    brand: 'Adidas',
    rating: 4.9,
    reviews: 200,
    originalPrice: 190.00,
    discountedPrice: 160.00
  },
  // Agrega más productos aquí...
]

async function main() {
  await prisma.product.createMany({ data: products })
  console.log('Productos insertados')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
