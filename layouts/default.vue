<template>
  <Drawer />
  <slot />
  <Footer />
</template>

<script setup>
import Drawer from "./components/Drawer.vue";
import Footer from "./components/Footer.vue";
</script>
