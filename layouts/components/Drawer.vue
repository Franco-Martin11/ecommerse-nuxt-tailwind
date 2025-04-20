<template>
  <div class="relative">
    <div
      ref="overlay"
      @click="closeDrawer"
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
      :style="{ visibility: drawerVisible ? 'visible' : 'hidden', opacity: 0 }"
    ></div>

    <div class="relative z-20">
      <div class="bg-base-300 w-full flex items-center p-4">
        <button
          @click="toggleDrawer"
          class="lg:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          aria-expanded="false"
        >
          <span class="sr-only">Abrir menú</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div class="mx-2 flex-1 px-2">Navbar Title</div>

        <div class="hidden lg:block">
          <ul class="flex space-x-4">
            <li>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-base-100"
                >Navbar Item 1</a
              >
            </li>
            <li>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-base-100"
                >Navbar Item 2</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      ref="drawer"
      class="fixed inset-y-0 left-0 w-80 bg-base-200 shadow-xl z-40"
      :style="{ visibility: drawerVisible ? 'visible' : 'hidden', x: '-100%' }"
    >
      <div class="p-4">
        <button
          @click="closeDrawer"
          class="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
        >
          <span class="sr-only">Cerrar menú</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul class="mt-6 space-y-2">
          <li>
            <a href="#" class="block px-4 py-2 rounded-md hover:bg-base-100"
              >Sidebar Item 1</a
            >
          </li>
          <li>
            <a href="#" class="block px-4 py-2 rounded-md hover:bg-base-100"
              >Sidebar Item 2</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

const drawer = ref(null);
const overlay = ref(null);
const drawerVisible = ref(false);

const animationDuration = 0.5;
const easeType = "power3.out";

// Función para bloquear el scroll del body
const lockBodyScroll = () => {
  document.body.classList.add("overflow-hidden");
};

// Función para desbloquear el scroll del body
const unlockBodyScroll = () => {
  document.body.classList.remove("overflow-hidden");
};

const openDrawer = () => {
  drawerVisible.value = true;

  // Bloquear el scroll
  lockBodyScroll();

  gsap.to(overlay.value, {
    opacity: 1,
    duration: animationDuration,
    ease: easeType,
  });

  gsap.to(drawer.value, {
    x: 0,
    duration: animationDuration,
    ease: easeType,
  });
};

const closeDrawer = () => {
  gsap.to(overlay.value, {
    opacity: 0,
    duration: animationDuration,
    ease: easeType,
  });

  gsap.to(drawer.value, {
    x: "-100%",
    duration: animationDuration,
    ease: easeType,
    onComplete: () => {
      drawerVisible.value = false;

      // Desbloquear el scroll
      unlockBodyScroll();
    },
  });
};

const toggleDrawer = () => {
  if (drawerVisible.value) {
    closeDrawer();
  } else {
    openDrawer();
  }
};

onMounted(() => {
  gsap.set(drawer.value, { x: "-100%" });
  gsap.set(overlay.value, { opacity: 0 });
});

onBeforeUnmount(() => {
  unlockBodyScroll();
});

const handleEscKey = (event) => {
  if (event.key === "Escape" && drawerVisible.value) {
    closeDrawer();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEscKey);
});
</script>

<style>
/* Estilos globales para ocultar el scrollbar cuando el drawer está abierto */
body.overflow-hidden {
  overflow: hidden;
}
</style>
