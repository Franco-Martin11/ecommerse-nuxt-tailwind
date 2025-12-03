<template>
  <div class="w-full bg-brand-black text-white py-6 overflow-hidden">
    <div ref="trackRef" class="flex whitespace-nowrap">
      <!-- Duplicamos el contenido para crear el efecto infinito -->
      <div v-for="i in 2" :key="i" class="flex items-center">
        <NuxtLink :to="'/catalog'" class="text-4xl lg:text-6xl font-heading font-black italic uppercase mx-8">
          <span class="text-brand-lime">{{ highlightText }}</span>
          <span class="text-gray-500 mx-4">{{ middleText }}</span>
          <span class="text-white">{{ endText }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'

interface Props {
  highlightText?: string
  middleText?: string
  endText?: string
}

const props = withDefaults(defineProps<Props>(), {
  highlightText: 'COLLUSION X RAYAN',
  middleText: 'SELECTED',
  endText: 'SUMMER / 2024'
})

const { trackRef } = useInfiniteScroll({ duration: 25 })
</script>
