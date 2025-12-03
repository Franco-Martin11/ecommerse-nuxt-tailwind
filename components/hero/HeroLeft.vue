<template>
  <div ref="heroLeft" class="relative bg-brand-sky overflow-hidden opacity-0">
    <img 
      :src="imageSrc" 
      :alt="imageAlt" 
      class="w-full h-full object-cover"
    />
    
    <!-- Overlay Content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
      <button 
        ref="ctaButton"
        @click="handleClick"
        class="bg-brand-lime text-brand-black font-heading font-black italic uppercase text-sm px-8 py-3 hover:bg-brand-black hover:text-brand-lime transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0"
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
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Hero Image',
  buttonText: 'Check New Arrivals'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const heroLeft = ref<HTMLElement | null>(null)
const ctaButton = ref<HTMLElement | null>(null)

const handleClick = () => {
  emit('click')
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(heroLeft.value, { opacity: 1, x: 0, duration: 1, startAt: { x: -100 } })
    .to(ctaButton.value, { opacity: 1, scale: 1, duration: 0.5, startAt: { scale: 0.8 } }, "-=0.5")
})
</script>
