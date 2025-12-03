<template>
  <section class="flex flex-col justify-center space-y-8" aria-label="Product Details">
    
    <!-- Price -->
    <div ref="priceEl" class="text-sm font-medium text-gray-500 opacity-0">
      <span v-if="originalPrice" class="line-through mr-2">{{ formatPrice(originalPrice) }}</span>
      <span class="text-brand-black">{{ formatPrice(price) }}</span>
    </div>

    <!-- Title -->
    <h1 ref="titleEl" class="text-5xl lg:text-7xl font-heading font-black italic uppercase leading-[0.9] tracking-tighter opacity-0">
      {{ title }}
    </h1>

    <!-- Controls -->
    <div ref="controlsEl" class="space-y-4 opacity-0">
      <div class="flex gap-4">
        <label class="sr-only" for="quantity">Quantity</label>
        <input 
          id="quantity"
          type="number" 
          min="1" 
          v-model="quantity"
          class="border border-brand-black px-4 py-3 w-16 text-center font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-lime"
        />
        
        <div class="border border-brand-black px-4 py-3 flex-grow font-medium text-gray-500 flex items-center justify-between cursor-not-allowed opacity-70">
          <span>{{ selectedColor }}</span>
          <span class="text-xs uppercase">Color</span>
        </div>
      </div>
      
      <button 
        @click="addToCart"
        class="w-full bg-brand-lime text-brand-black font-heading font-black italic uppercase text-xl py-4 hover:bg-brand-black hover:text-brand-lime transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        aria-label="Add to cart"
      >
        ADD TO CART
      </button>
    </div>

    <!-- Details Accordion -->
    <div ref="detailsEl" class="space-y-6 pt-8 opacity-0">
      <article v-for="(section, index) in details" :key="index">
        <h3 
          @click="toggleSection(index)"
          class="font-heading font-bold text-lg uppercase flex justify-between items-center cursor-pointer select-none"
          :aria-expanded="openSections.includes(index)"
        >
          {{ section.title }}
          <span class="transform transition-transform duration-300" :class="{ 'rotate-180': openSections.includes(index) }">^</span>
        </h3>
        <div 
          v-show="openSections.includes(index)"
          class="mt-4 text-sm text-gray-600 space-y-2 pl-2 border-l-2 border-brand-lime"
        >
          <div v-html="section.content"></div>
        </div>
      </article>
    </div>

  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

interface ProductDetail {
  title: string
  content: string
}

interface Props {
  title: string
  price: number
  originalPrice?: number | null
  currency?: string
  color?: string
  details?: ProductDetail[]
}

const props = withDefaults(defineProps<Props>(), {
  originalPrice: null,
  currency: 'USD',
  color: 'Metallic',
  details: () => []
})

const emit = defineEmits<{
  (e: 'add-to-cart', payload: { quantity: number; color: string }): void
}>()

const quantity = ref(1)
const selectedColor = ref(props.color)
const openSections = ref<number[]>([0]) // First section open by default

const priceEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const controlsEl = ref<HTMLElement | null>(null)
const detailsEl = ref<HTMLElement | null>(null)

const formatPrice = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: props.currency }).format(val)
}

const toggleSection = (index: number) => {
  if (openSections.value.includes(index)) {
    openSections.value = openSections.value.filter(i => i !== index)
  } else {
    openSections.value.push(index)
  }
}

const addToCart = () => {
  if (selectedColor.value) {
    emit('add-to-cart', {
      quantity: quantity.value,
      color: selectedColor.value
    })
  }
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (priceEl.value) tl.to(priceEl.value, { opacity: 1, y: 0, duration: 0.5, startAt: { y: 20 } })
  if (titleEl.value) tl.to(titleEl.value, { opacity: 1, x: 0, duration: 0.8, startAt: { x: 50 } }, "-=0.3")
  if (controlsEl.value) tl.to(controlsEl.value, { opacity: 1, y: 0, duration: 0.5, startAt: { y: 20 } }, "-=0.4")
  if (detailsEl.value) tl.to(detailsEl.value, { opacity: 1, duration: 0.5 }, "-=0.2")
})
</script>
