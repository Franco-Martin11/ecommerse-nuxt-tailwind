<template>
  <div class="container mx-auto p-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-[#000000]">Ejemplos de Componente MarqueeText</h1>
    
    <div class="space-y-12">
      <!-- Ejemplo 1: Configuración básica (como en Hero) -->
      <div class="example-section">
        <h2 class="text-xl font-semibold mb-2 text-[#000000]">Ejemplo 1: Configuración básica (Hero)</h2>
        <p class="mb-4 text-[#000000]/80">Configuración utilizada en el Hero con colores de Collusion.</p>
        
        <MarqueeText 
          :items="example1Items" 
          :highlightIndices="[0]"
          :speed="20"
          :repetitions="3"
        />
      </div>
      
      <!-- Ejemplo 2: Colores personalizados -->
      <div class="example-section">
        <h2 class="text-xl font-semibold mb-2 text-[#000000]">Ejemplo 2: Colores personalizados</h2>
        <p class="mb-4 text-[#000000]/80">Uso de colores personalizados para cada elemento.</p>
        
        <MarqueeText 
          :items="example2Items" 
          :highlightIndices="[1, 3]"
          :colors="['text-[#ff0000]', 'text-[#00ff00]', 'text-[#0000ff]', 'text-[#ff00ff]']"
          :speed="15"
          backgroundColor="#333333"
        />
      </div>
      
      <!-- Ejemplo 3: Velocidad rápida -->
      <div class="example-section">
        <h2 class="text-xl font-semibold mb-2 text-[#000000]">Ejemplo 3: Velocidad rápida</h2>
        <p class="mb-4 text-[#000000]/80">Marquee con velocidad rápida y fondo claro.</p>
        
        <MarqueeText 
          :items="example3Items" 
          :highlightIndices="[0, 2, 4]"
          :speed="10"
          backgroundColor="#f0f0f0"
        />
      </div>
      
      <!-- Ejemplo 4: Muchos ítems -->
      <div class="example-section">
        <h2 class="text-xl font-semibold mb-2 text-[#000000]">Ejemplo 4: Varios ítems</h2>
        <p class="mb-4 text-[#000000]/80">Marquee con varios ítems y menor número de repeticiones.</p>
        
        <MarqueeText 
          :items="example4Items" 
          :highlightIndices="[1, 3]"
          :repetitions="2"
          :speed="25"
          backgroundColor="#000080"
        />
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <nuxt-link to="/" class="bg-[#faff02] text-[#000000] px-4 py-2 rounded-md hover:bg-[#e6e602] transition-colors inline-block">
        Volver al inicio
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MarqueeText from '~/components/MarqueeText.vue';

// Datos para cada ejemplo
const example1Items = ref(['COLLUSION X RAYAN', 'SELECTED', 'SUMMER / 2024']);

const example2Items = ref(['PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO']);

const example3Items = ref(['OFERTAS', 'HASTA', '70%', 'DESCUENTO', 'FINAL']);

const example4Items = ref([
  'MODA', 'ESTILO', 'DISEÑO', 'TENDENCIA', 'FASHION', 'EXCLUSIVO'
]);

</script>

<style scoped>
.example-section {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style> 