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
    name: 'Nike Air Max 90',
    slug: 'nike-air-max-90',
    brand: 'Nike',
    rating: 4.8,
    reviews: 98,
    originalPrice: 200.00,
    discountedPrice: 170.00
  },
  {
    name: 'Nike Zoom Fly 5',
    slug: 'nike-zoom-fly-5',
    brand: 'Nike',
    rating: 4.7,
    reviews: 76,
    originalPrice: 220.00,
    discountedPrice: 190.00
  },
  {
    name: 'Nike Pegasus Trail 4',
    slug: 'nike-pegasus-trail-4',
    brand: 'Nike',
    rating: 4.6,
    reviews: 89,
    originalPrice: 160.00,
    discountedPrice: 140.00
  },
  {
    name: "Nike Blazer Mid '77",
    slug: 'nike-blazer-mid-77',
    brand: 'Nike',
    rating: 4.9,
    reviews: 150,
    originalPrice: 120.00,
    discountedPrice: 100.00
  },
  {
    name: 'Nike React Infinity Run',
    slug: 'nike-react-infinity-run',
    brand: 'Nike',
    rating: 4.8,
    reviews: 110,
    originalPrice: 180.00,
    discountedPrice: 150.00
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
  {
    name: 'Adidas NMD R1',
    slug: 'adidas-nmd-r1',
    brand: 'Adidas',
    rating: 4.7,
    reviews: 140,
    originalPrice: 150.00,
    discountedPrice: 130.00
  },
  {
    name: 'Adidas Forum Low',
    slug: 'adidas-forum-low',
    brand: 'Adidas',
    rating: 4.6,
    reviews: 95,
    originalPrice: 110.00,
    discountedPrice: 90.00
  },
  {
    name: 'Adidas Gazelle',
    slug: 'adidas-gazelle',
    brand: 'Adidas',
    rating: 4.8,
    reviews: 120,
    originalPrice: 100.00,
    discountedPrice: 85.00
  },
  {
    name: 'Adidas Superstar',
    slug: 'adidas-superstar',
    brand: 'Adidas',
    rating: 4.9,
    reviews: 180,
    originalPrice: 120.00,
    discountedPrice: 100.00
  },
  {
    name: 'Adidas Terrex Swift R3',
    slug: 'adidas-terrex-swift-r3',
    brand: 'Adidas',
    rating: 4.7,
    reviews: 75,
    originalPrice: 140.00,
    discountedPrice: 120.00
  },
  {
    name: 'Reebok Club C 85',
    slug: 'reebok-club-c-85',
    brand: 'Reebok',
    rating: 4.8,
    reviews: 130,
    originalPrice: 100.00,
    discountedPrice: 85.00
  },
  {
    name: 'Reebok Nano X3',
    slug: 'reebok-nano-x3',
    brand: 'Reebok',
    rating: 4.7,
    reviews: 90,
    originalPrice: 130.00,
    discountedPrice: 110.00
  },
  {
    name: 'Reebok Zig Kinetica',
    slug: 'reebok-zig-kinetica',
    brand: 'Reebok',
    rating: 4.6,
    reviews: 80,
    originalPrice: 120.00,
    discountedPrice: 100.00
  },
  {
    name: 'Reebok Floatride Energy 4',
    slug: 'reebok-floatride-energy-4',
    brand: 'Reebok',
    rating: 4.8,
    reviews: 100,
    originalPrice: 140.00,
    discountedPrice: 120.00
  },
  {
    name: 'Reebok Classic Leather',
    slug: 'reebok-classic-leather',
    brand: 'Reebok',
    rating: 4.9,
    reviews: 150,
    originalPrice: 90.00,
    discountedPrice: 75.00
  },
  {
    name: 'Reebok Legacy Lifter II',
    slug: 'reebok-legacy-lifter-ii',
    brand: 'Reebok',
    rating: 4.7,
    reviews: 70,
    originalPrice: 200.00,
    discountedPrice: 180.00
  },
  {
    name: 'Puma RS-X3',
    slug: 'puma-rs-x3',
    brand: 'Puma',
    rating: 4.8,
    reviews: 110,
    originalPrice: 120.00,
    discountedPrice: 100.00
  },
  {
    name: 'Puma Suede Classic',
    slug: 'puma-suede-classic',
    brand: 'Puma',
    rating: 4.9,
    reviews: 140,
    originalPrice: 80.00,
    discountedPrice: 70.00
  },
  {
    name: 'Puma Future Rider',
    slug: 'puma-future-rider',
    brand: 'Puma',
    rating: 4.7,
    reviews: 90,
    originalPrice: 100.00,
    discountedPrice: 85.00
  },
  {
    name: 'Puma Cali Star',
    slug: 'puma-cali-star',
    brand: 'Puma',
    rating: 4.6,
    reviews: 75,
    originalPrice: 90.00,
    discountedPrice: 75.00
  },
  {
    name: 'Puma Ignite Flash',
    slug: 'puma-ignite-flash',
    brand: 'Puma',
    rating: 4.8,
    reviews: 95,
    originalPrice: 110.00,
    discountedPrice: 95.00
  },
  {
    name: 'Puma Deviate Nitro',
    slug: 'puma-deviate-nitro',
    brand: 'Puma',
    rating: 4.9,
    reviews: 130,
    originalPrice: 150.00,
    discountedPrice: 130.00
  }
];

async function main() {
  await prisma.product.createMany({ data: products })
  console.log('Productos insertados')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
