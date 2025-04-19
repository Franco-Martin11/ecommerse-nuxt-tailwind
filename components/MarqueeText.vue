<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="text-white py-6 overflow-hidden relative"
  >
    <div class="marquee-container">
      <div class="marquee-content">
        <template v-for="(item, index) in processedItems" :key="index">
          <span
            class="text-5xl font-bold mr-6"
            :class="[
              item.highlight ? 'text-[#faff02] highlight-text' : item.color,
            ]"
          >
            {{ item.text }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Array de textos para mostrar
  items: {
    type: Array,
    default: () => ["ITEM 1", "ITEM 2", "ITEM 3"],
  },
  // Especifica qué items deben destacarse (índices)
  highlightIndices: {
    type: Array,
    default: () => [0],
  },
  // Colores personalizados para cada item (por índice)
  colors: {
    type: Array,
    default: () => [],
  },
  // Velocidad de la animación en segundos
  speed: {
    type: Number,
    default: 20,
  },
  // Número de repeticiones de los items
  repetitions: {
    type: Number,
    default: 3,
  },
  // Color de fondo
  backgroundColor: {
    type: String,
    default: "#000000",
  },
});

// Procesar los items para repetirlos y aplicar estilos
const processedItems = computed(() => {
  const result = [];

  // Repetir el conjunto de items el número especificado de veces
  for (let rep = 0; rep < props.repetitions; rep++) {
    props.items.forEach((text, index) => {
      const item = {
        text,
        highlight: props.highlightIndices.includes(index),
        color:
          props.colors[index] ||
          (index === 1 ? "text-[#efefef]/70" : "text-[#ffffff]"),
      };
      result.push(item);
    });
  }

  return result;
});
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: inline-flex;
  white-space: nowrap;
  animation: marquee v-bind('speed + "s"') linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%); /* Mostrar tres conjuntos */
  }
}

/* Efecto de destacado para textos resaltados */
.highlight-text {
  position: relative;
  display: inline-block;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    text-shadow: 0 0 4px rgba(250, 255, 2, 0.3);
  }
  50% {
    text-shadow: 0 0 10px rgba(250, 255, 2, 0.7);
  }
}
</style>
