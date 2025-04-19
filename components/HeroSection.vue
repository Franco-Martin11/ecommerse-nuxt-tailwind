<template>
  <div>
    <MarqueeText
      :items="marqueeItems"
      :highlightIndices="[0]"
      :speed="20"
      :repetitions="3"
      backgroundColor="#000000"
    />

    <SectionHeading title="Spring / Summer 2024 Collection" seeAll />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MarqueeText from "./MarqueeText.vue";
import SectionHeading from "./SectionHeading.vue";
const marqueeItems = ref(["COLLUSION X RAYAN", "SELECTED", "SUMMER / 2024"]);

</script>
