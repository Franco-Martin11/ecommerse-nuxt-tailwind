<template>
  <div class="w-full bg-brand-lime overflow-hidden py-2">
    <div ref="trackRef" class="flex whitespace-nowrap">
      <!-- Duplicamos el contenido para crear el efecto infinito -->
      <div v-for="i in 2" :key="i" class="flex items-center">
        <NuxtLink :to="'/catalog'" class="mx-8 text-brand-black font-heading font-black text-sm uppercase tracking-wider">
          +++ New Collection
        </NuxtLink>
        <NuxtLink :to="'/catalog'" class="mx-8 text-brand-black font-heading font-black text-sm uppercase tracking-wider">
          +++ Open for New Collection
        </NuxtLink>
        <NuxtLink to="/catalog" class="mx-8 text-brand-black font-heading font-black text-sm uppercase tracking-wider">
          +++ New Collection
        </NuxtLink>
        <NuxtLink to="/catalog" class="mx-8 text-brand-black font-heading font-black text-sm uppercase tracking-wider">
          +++ Open for New Collection
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'

const { trackRef } = useInfiniteScroll({ duration: 20 })
</script>
