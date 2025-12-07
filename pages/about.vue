<template>

    <section
        class="flex flex-row gap-4 bg-amber-100 p-4 items-center overflow-x-auto scroll-snap-type-x snap-mandatory">
        <template v-for="(item, index) in productCatalog" :key="index">
            <ProductCard :product="item" :class="[index ? 'snap-start' : 'scroll-snap-align-start']"></ProductCard>
        </template>
    </section>
    <section
        class="flex flex-row gap-4 bg-amber-400 p-4 items-center overflow-x-auto scroll-snap-type-x snap-mandatory">
        <template v-for="(item, index) in catalogFilteredByBrand" :key="index">
            <ProductCard :product="item" :class="[index ? 'snap-start' : 'scroll-snap-align-start']"></ProductCard>
        </template>
    </section>
</template>

<script setup lang="ts">
import { useComposableProductCatalogStore } from '~/stores/store';
import ProductCard from '~/components/ProductCard.vue';
import { onMounted } from 'vue';

const { productCatalogFilteredByBrand,
    catalogFilteredByBrand, productCatalog } = useComposableProductCatalogStore()

onMounted(() => {
    productCatalogFilteredByBrand('');
});
</script>

<style scoped></style>