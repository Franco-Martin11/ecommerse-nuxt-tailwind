<template>
    <div>
        <h1 class="font-thin text-red-400">Esto es una prueba a ver si es que funciona correctamente el script este de
            nuxt 3 que es nuevo y nunca lo
            use pero le tengo confianza</h1>
        <HeadingElement :title="name"></HeadingElement>
        <span>{{ count }}</span>
        <span>{{ doubleCount }}</span>
        <button type="button" @click="store.increment">Doble</button>
        <button class="btn btn-primary">Primary</button>
        <div class="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
            <div class="collapse-content">
                <p>hello</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/store';

const store = useCounterStore()
const { name, count, doubleCount, } = storeToRefs(store)
</script>

<style scoped></style>