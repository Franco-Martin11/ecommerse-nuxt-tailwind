<template>
  <div class="container mx-auto px-4 py-8 lg:py-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      
      <!-- Left Column: Images -->
      <div class="lg:col-span-7">
        <ProductGallery 
          :images="product.images" 
          :season="product.season" 
        />
      </div>

      <!-- Right Column: Product Details -->
      <div class="lg:col-span-5">
        <ProductInfo 
          :title="product.title"
          :price="product.price"
          :original-price="product.originalPrice"
          :currency="product.currency"
          :color="product.color"
          :details="product.details"
          @add-to-cart="handleAddToCart"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductGallery from '~/components/product/ProductGallery.vue'
import ProductInfo from '~/components/product/ProductInfo.vue'

interface ProductImage {
  src: string
  alt: string
  label?: string
}

interface ProductDetail {
  title: string
  content: string
}

interface Product {
  title: string
  price: number
  originalPrice: number
  currency: string
  color: string
  season: string
  images: ProductImage[]
  details: ProductDetail[]
}

// Mock Data (In a real app, this would come from an API or store)
const product: Product = {
  title: 'Casual Metallic Grey Tank Top & Cami',
  price: 15.00,
  originalPrice: 15.00,
  currency: 'USD',
  color: 'Metallic',
  season: 'SUMMER 2024',
  images: [
    { 
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', 
      alt: 'Model wearing metallic grey tank top',
      label: 'COLLUSION'
    },
    { 
      src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop', 
      alt: 'Close up detail of fabric',
      label: 'COLLUSION'
    }
  ],
  details: [
    {
      title: 'Materials & Details',
      content: `
        <p>Fabric: Medium Stretch</p>
        <p>Fit Type: Slim Fit</p>
        <p>Sheer: Yes</p>
        <p>Composition: 94% Polyester, 6% Elastane</p>
      `
    },
    {
      title: 'Description',
      content: `
        <p>Color: Metallic</p>
        <p>Style: Casual</p>
        <p>Pattern Type: Figure, Letter, All Over Print</p>
        <p>Neckline: Strapless</p>
      `
    }
  ]
}

const handleAddToCart = (payload: { quantity: number; color: string }) => {
  console.log('Added to cart:', payload)
  // Implement cart logic here (e.g., Pinia store)
}

// SEO & Meta Tags
useHead({
  title: product.title + ' | COLLUSION',
  meta: [
    { name: 'description', content: `Shop the ${product.title}. ${product.season} collection. Available now.` },
    { property: 'og:title', content: product.title },
    { property: 'og:description', content: `Shop the ${product.title}.` },
    { property: 'og:image', content: product.images[0].src },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images.map(img => img.src),
        description: `Shop the ${product.title}.`,
        brand: {
          '@type': 'Brand',
          name: 'COLLUSION'
        },
        offers: {
          '@type': 'Offer',
          url: 'https://example.com/product', // Dynamic URL in real app
          priceCurrency: product.currency,
          price: product.price,
          availability: 'https://schema.org/InStock'
        }
      })
    }
  ]
})
</script>
