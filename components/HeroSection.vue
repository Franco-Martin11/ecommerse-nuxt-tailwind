<template>
  <div>
    <!-- Banda Negra con Animación Mejorada -->
    <MarqueeText
      :items="marqueeItems"
      :highlightIndices="[0]"
      :speed="20"
      :repetitions="3"
      backgroundColor="#000000"
    />

    <!-- Título de Colección -->
    <div
      class="bg-[#ffffff] py-6 px-8 flex justify-between items-center border-b border-[#e0e0e0]"
    >
      <h3 class="text-4xl font-bold text-[#000000]">
        Spring / Summer 2024 Collection
      </h3>
      <span
        class="text-sm uppercase font-medium text-[#000000] hover:text-[#faff02] cursor-pointer transition-colors"
        >See All</span
      >
    </div>

    <button class="btn btn-accent">
      Click me
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MarqueeText from "./MarqueeText.vue";

// Texto para el marquee
const marqueeItems = ref(["COLLUSION X RAYAN", "SELECTED", "SUMMER / 2024"]);
</script>
