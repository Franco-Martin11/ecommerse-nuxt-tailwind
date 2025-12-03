<template>
  <div class="min-h-screen flex flex-col font-sans bg-brand-white text-brand-black overflow-x-hidden">
    <!-- Promo Bar -->
    <PromoBar />
    
    <!-- Header -->
    <Drawer />
    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Simple Footer (Optional, based on generic need) -->
 <Footer />
  </div>
</template>

<script lang="ts" setup> 
import PromoBar from '~/components/PromoBar.vue'
import Drawer from './components/Drawer.vue'
import Footer from './components/Footer.vue'
 
</script>

<style scoped>
/* Add any specific overrides here if needed */
</style>
