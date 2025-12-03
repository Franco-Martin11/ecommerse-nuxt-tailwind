<template>
  <div class="min-h-screen bg-brand-white">
    <!-- Hero Section -->
    <section class="relative w-full min-h-screen">
      <!-- Grid de 2 columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        <!-- Left Column: Primera Modelo -->
        <HeroLeft 
          :image-src="heroData.leftImage.src"
          :image-alt="heroData.leftImage.alt"
          :button-text="heroData.leftImage.buttonText"
          @click="handleLeftClick"
        />

        <!-- Right Column: Segunda Modelo + Texto -->
        <HeroRight 
          :image-src="heroData.rightImage.src"
          :image-alt="heroData.rightImage.alt"
          :badge="heroData.rightContent.badge"
          :title="heroData.rightContent.title"
          :description="heroData.rightContent.description"
          :button-text="heroData.rightContent.buttonText"
          @click="handleScrollDown"
        />
      </div>

      <!-- Banner Inferior -->
      <div class="w-full">
        <HeroBanner 
          :highlight-text="heroData.banner.highlightText"
          :middle-text="heroData.banner.middleText"
          :end-text="heroData.banner.endText"
        />
      </div>
    </section>

    <!-- Collection Section -->
    <section class="py-20 px-8">
      <div class="container mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 ref="collectionTitle" class="text-5xl lg:text-7xl font-heading font-black uppercase opacity-0">
            Spring / Summer 2024 Collection
          </h2>
          <NuxtLink 
            to="/catalog" 
            class="text-sm font-bold uppercase tracking-widest underline hover:text-brand-lime transition-colors"
          >
            See All
          </NuxtLink>
        </div>
        
        <!-- Aquí puedes agregar un grid de productos -->
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import HeroLeft from '~/components/hero/HeroLeft.vue'
import HeroRight from '~/components/hero/HeroRight.vue'
import HeroBanner from '~/components/hero/HeroBanner.vue'

interface HeroData {
  leftImage: {
    src: string
    alt: string
    buttonText: string
  }
  rightImage: {
    src: string
    alt: string
  }
  rightContent: {
    badge: string
    title: string
    description: string
    buttonText: string
  }
  banner: {
    highlightText: string
    middleText: string
    endText: string
  }
}

const heroData: HeroData = {
  leftImage: {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    alt: 'Model wearing metallic outfit',
    buttonText: 'Check New Arrivals'
  },
  rightImage: {
    src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Model in pink top'
  },
  rightContent: {
    badge: '— Summer 2024',
    title: 'Creating\nUnique Style.',
    description: 'From concept to execution, we craft timeless identities that resonate with your audience.',
    buttonText: 'Scroll Down ↓'
  },
  banner: {
    highlightText: 'COLLUSION X RAYAN',
    middleText: 'SELECTED',
    endText: 'SUMMER / 2024'
  }
}

const collectionTitle = ref<HTMLElement | null>(null)

const handleLeftClick = () => {
  // Navegar a la página de nuevos productos
  navigateTo('/catalog')
}

const handleScrollDown = () => {
  // Scroll suave a la sección de colección
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Animación del título de la colección
  gsap.to(collectionTitle.value, { 
    opacity: 1, 
    x: 0, 
    duration: 0.8, 
    delay: 2,
    ease: 'power3.out',
    startAt: { x: -50 } 
  })
})

// SEO
useHead({
  title: 'COLLUSION - Creating Unique Style | Summer 2024',
  meta: [
    { name: 'description', content: 'Discover the new Spring/Summer 2024 collection. From concept to execution, we craft timeless identities.' },
    { property: 'og:title', content: 'COLLUSION - Creating Unique Style' },
    { property: 'og:description', content: 'Discover the new Spring/Summer 2024 collection.' },
    { property: 'og:image', content: heroData.leftImage.src },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>
