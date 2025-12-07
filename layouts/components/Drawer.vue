<template>
    <header ref="header" class="w-full bg-brand-white border-b border-gray-200 px-6 py-4 flex items-center justify-between opacity-0">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="text-brand-blue text-2xl">💙</div> <!-- Placeholder for the heart icon -->
        <h1 class="font-heading font-bold text-xl tracking-tighter italic uppercase">COLLUSION</h1>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
        <NuxtLink to="/" class="hover:text-brand-lime transition-colors">NEW COLLECTION</NuxtLink>
        <NuxtLink to="/catalog" class="hover:text-brand-lime transition-colors">CATALOG</NuxtLink>
        <NuxtLink to="/about" class="hover:text-brand-lime transition-colors">ABOUT BRAND</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-brand-lime transition-colors">BLOG</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-brand-lime transition-colors">CONTACT US</NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-6">
        <button class="text-sm font-medium hover:text-brand-lime transition-colors">CART (0)</button>
        <button class="bg-brand-black text-brand-white px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-brand-lime hover:text-brand-black transition-colors">
          SHOP ALL NEW
        </button>
      </div>
    </header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const header = ref<HTMLElement | null>(null)

onMounted(() => {
  if (header.value) {
    gsap.to(header.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      startAt: { y: -50 }
    })
  }
})
</script>