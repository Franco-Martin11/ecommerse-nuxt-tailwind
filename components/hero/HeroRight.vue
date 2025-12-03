<template>
  <div ref="heroRight" class="relative bg-white flex flex-col opacity-0">
    <!-- Imagen Superior -->
    <div class="relative h-1/2 overflow-hidden">
      <img 
        :src="imageSrc" 
        :alt="imageAlt" 
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Sección de Texto -->
    <div class="h-1/2 flex flex-col justify-center px-12 lg:px-20 py-12 bg-white">
      <div ref="badgeEl" class="inline-block mb-6 opacity-0">
        <span class="border-2 border-brand-black px-4 py-2 text-xs font-bold uppercase tracking-widest bg-white">
          {{ badge }}
        </span>
      </div>

      <h1 ref="heroTitle" class="text-6xl lg:text-8xl font-heading font-black italic uppercase leading-[0.85] mb-6 opacity-0">
        {{ title }}
      </h1>

      <p ref="heroText" class="text-base text-gray-600 mb-8 max-w-md opacity-0">
        {{ description }}
      </p>

      <button 
        ref="scrollButton"
        @click="handleClick"
        class="self-start bg-brand-lime text-brand-black font-heading font-black italic uppercase text-sm px-8 py-4 hover:bg-brand-black hover:text-brand-lime transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] opacity-0"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

interface Props {
  imageSrc: string
  imageAlt?: string
  badge?: string
  title: string
  description: string
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Hero Image',
  badge: '— Summer 2024',
  buttonText: 'Scroll Down ↓'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const heroRight = ref<HTMLElement | null>(null)
const badgeEl = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroText = ref<HTMLElement | null>(null)
const scrollButton = ref<HTMLElement | null>(null)

const handleClick = () => {
  emit('click')
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(heroRight.value, { opacity: 1, x: 0, duration: 1, startAt: { x: 100 } })
    .to(badgeEl.value, { opacity: 1, y: 0, duration: 0.5, startAt: { y: -20 } }, "-=0.5")
    .to(heroTitle.value, { opacity: 1, y: 0, duration: 0.8, startAt: { y: 50 } }, "-=0.4")
    .to(heroText.value, { opacity: 1, duration: 0.5 }, "-=0.3")
    .to(scrollButton.value, { opacity: 1, y: 0, duration: 0.5, startAt: { y: 20 } }, "-=0.2")
})
</script>
