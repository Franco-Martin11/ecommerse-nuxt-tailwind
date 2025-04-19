<template>
  <div>
    <MarqueeText
      :items="marqueeItems"
      :highlightIndices="[0]"
      :speed="20"
      :repetitions="3"
      backgroundColor="#000000"
    />

    <!-- Título de Colección con animación GSAP -->
    <div
      ref="heroContent"
      class="bg-[#ffffff] py-6 px-8 flex justify-between items-center border-b border-[#e0e0e0] opacity-0"
    >
      <h3 class="text-4xl font-bold text-[#000000]">
        Spring / Summer 2024 Collection
      </h3>
      <span
        class="text-sm uppercase font-medium text-[#000000] hover:text-[#faff02] cursor-pointer transition-colors"
        >See All</span
      >
    </div>

    <button ref="heroButton" class="btn btn-accent opacity-0">
      Click me
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MarqueeText from "./MarqueeText.vue";
import gsap from "gsap";

const marqueeItems = ref(["COLLUSION X RAYAN", "SELECTED", "SUMMER / 2024"]);
const heroContent = ref(null);
const heroButton = ref(null);

onMounted(() => {
  // Animación fade de bottom a top con GSAP
  gsap.fromTo(
    heroContent.value,
    { 
      opacity: 0, 
      y: 50 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      ease: "power2.out" 
    }
  );
  
  // Animación con un pequeño retraso para el botón
  gsap.fromTo(
    heroButton.value,
    { 
      opacity: 0, 
      y: 30 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.5, 
      delay: 0.2, 
      ease: "power2.out" 
    }
  );
});
</script>
