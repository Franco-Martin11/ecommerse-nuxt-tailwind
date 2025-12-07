<template>
  <section class="relative min-h-[60vh] lg:min-h-[80vh] flex flex-col gap-4" aria-label="Product Gallery">
    <!-- Background decorative element -->
    <div class="absolute inset-0 bg-brand-sky opacity-20 -z-10 rounded-3xl transform -rotate-1"></div>

    <!-- Main Image Card -->
    <figure 
      ref="mainCard" 
      class="image-card bg-brand-white p-4 shadow-xl transform rotate-2 w-full max-w-md mx-auto lg:ml-auto lg:mr-12 z-10 opacity-0"
    >
      <div class="relative aspect-[3/4] overflow-hidden bg-brand-sky">
         <img 
           :src="mainImage.src" 
           :alt="mainImage.alt" 
           class="object-cover w-full h-full mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700" 
           loading="eager"
         />
         <div v-if="mainImage.label" class="absolute top-4 left-4 text-xs font-bold tracking-widest">{{ mainImage.label }}</div>
         <div v-if="season" class="absolute top-4 right-4 text-xs font-bold tracking-widest">{{ season }}</div>
      </div>
    </figure>

    <!-- Secondary Image Card (Lower Left) -->
    <figure 
      v-if="secondaryImage"
      ref="secondaryCard" 
      class="image-card bg-brand-white p-4 shadow-lg transform -rotate-3 w-64 absolute bottom-10 left-0 lg:left-10 z-20 hidden md:block opacity-0"
    >
      <div class="relative aspect-[4/3] overflow-hidden bg-brand-sky">
         <img 
           :src="secondaryImage.src" 
           :alt="secondaryImage.alt" 
           class="object-cover w-full h-full mix-blend-multiply opacity-90" 
           loading="lazy"
         />
         <div v-if="secondaryImage.label" class="absolute bottom-2 left-2 text-[10px] font-bold tracking-widest">{{ secondaryImage.label }}</div>
      </div>
    </figure>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'

interface Image {
  src: string
  alt: string
  label?: string
}

interface Props {
  images: Image[]
  season?: string
}

const props = withDefaults(defineProps<Props>(), {
  season: ''
})

const mainImage = computed(() => props.images[0])
const secondaryImage = computed(() => props.images[1])

const mainCard = ref<HTMLElement | null>(null)
const secondaryCard = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (mainCard.value) {
    tl.to(mainCard.value, { opacity: 1, y: 0, rotation: 2, duration: 1, startAt: { y: 100, rotation: 0 } })
  }
  
  if (secondaryCard.value) {
    tl.to(secondaryCard.value, { opacity: 1, x: 0, rotation: -3, duration: 1, startAt: { x: -50, rotation: 0 } }, "-=0.8")
  }
})
</script>
