<template>
    <section class="flex flex-row gap-4 p-4 items-center overflow-x-auto scroll-snap-type-x snap-mandatory ">
        <ProductCard class="scroll-snap-align-start"></ProductCard>
        <ProductCard class="snap-start"></ProductCard>
        <ProductCard class="snap-start"></ProductCard>
        <ProductCard class="snap-start"></ProductCard>
        <ProductCard class="snap-start"></ProductCard>
        <ProductCard class="snap-start"></ProductCard>
    </section>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/store';
import ProductCard from '~/components/ProductCard.vue';

const store = useCounterStore()
const { name, count, doubleCount, } = storeToRefs(store)
</script>

<style scoped></style>