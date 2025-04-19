<template>
  <div
    v-if="props.title || props.seeAll"
    ref="heroContent"
    class="bg-[#ffffff] py-6 px-8 flex justify-between items-center border-b border-[#e0e0e0] opacity-0"
  >
    <h3 class="text-4xl font-bold text-[#000000]">
      {{ props.title }}
    </h3>
    <span
      v-if="props.seeAll"
      class="prose-sm uppercase font-medium text-[#000000] hover:text-primary cursor-pointer transition-colors"
      >See All</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
const heroContent = ref(null);

interface Props {
  title: string;
  seeAll: boolean;
}

const props = defineProps<Props>();

onMounted(() => {
  // Animación fade de bottom a top con GSAP
  gsap.fromTo(
    heroContent.value,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }
  );
});
</script>
