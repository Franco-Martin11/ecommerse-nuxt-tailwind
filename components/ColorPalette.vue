<template>
  <div class="p-8">
    <h1 class="text-3xl font-heading font-bold mb-8">Paleta de Colores</h1>
    
    <!-- Base Colors -->
    <section class="mb-10">
      <h2 class="text-2xl font-heading mb-4">Colores Base</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <div class="h-20 bg-base-100 border rounded-t-lg flex items-end p-2">
            <span class="text-base-content text-sm">base-100</span>
          </div>
          <div class="p-2 bg-base-content text-base-100 rounded-b-lg text-center text-sm">
            base-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-base-200 border rounded-t-lg flex items-end p-2">
            <span class="text-base-content text-sm">base-200</span>
          </div>
          <div class="p-2 bg-base-content text-base-100 rounded-b-lg text-center text-sm">
            base-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-base-300 border rounded-t-lg flex items-end p-2">
            <span class="text-base-content text-sm">base-300</span>
          </div>
          <div class="p-2 bg-base-content text-base-100 rounded-b-lg text-center text-sm">
            base-content
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Colors -->
    <section class="mb-10">
      <h2 class="text-2xl font-heading mb-4">Colores Principales</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <div class="h-20 bg-primary rounded-t-lg flex items-end p-2">
            <span class="text-primary-content text-sm">primary</span>
          </div>
          <div class="p-2 bg-primary-content text-primary rounded-b-lg text-center text-sm">
            primary-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-secondary rounded-t-lg flex items-end p-2">
            <span class="text-secondary-content text-sm">secondary</span>
          </div>
          <div class="p-2 bg-secondary-content text-secondary rounded-b-lg text-center text-sm">
            secondary-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-accent rounded-t-lg flex items-end p-2">
            <span class="text-accent-content text-sm">accent</span>
          </div>
          <div class="p-2 bg-accent-content text-accent rounded-b-lg text-center text-sm">
            accent-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-neutral rounded-t-lg flex items-end p-2">
            <span class="text-neutral-content text-sm">neutral</span>
          </div>
          <div class="p-2 bg-neutral-content text-neutral rounded-b-lg text-center text-sm">
            neutral-content
          </div>
        </div>
      </div>
    </section>
    
    <!-- Status Colors -->
    <section class="mb-10">
      <h2 class="text-2xl font-heading mb-4">Colores de Estado</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <div class="h-20 bg-info rounded-t-lg flex items-end p-2">
            <span class="text-info-content text-sm">info</span>
          </div>
          <div class="p-2 bg-info-content text-info rounded-b-lg text-center text-sm">
            info-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-success rounded-t-lg flex items-end p-2">
            <span class="text-success-content text-sm">success</span>
          </div>
          <div class="p-2 bg-success-content text-success rounded-b-lg text-center text-sm">
            success-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-warning rounded-t-lg flex items-end p-2">
            <span class="text-warning-content text-sm">warning</span>
          </div>
          <div class="p-2 bg-warning-content text-warning rounded-b-lg text-center text-sm">
            warning-content
          </div>
        </div>
        <div class="flex flex-col">
          <div class="h-20 bg-error rounded-t-lg flex items-end p-2">
            <span class="text-error-content text-sm">error</span>
          </div>
          <div class="p-2 bg-error-content text-error rounded-b-lg text-center text-sm">
            error-content
          </div>
        </div>
      </div>
    </section>
    
    <!-- Typography -->
    <section>
      <h2 class="text-2xl font-heading mb-4">Tipografía</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border rounded">
          <h3 class="text-xl font-heading mb-2">Montserrat (Headings)</h3>
          <p class="font-heading">Esta es la tipografía Montserrat para títulos y encabezados.</p>
          <div class="mt-4">
            <h4 class="font-heading text-lg">Ejemplo de H4</h4>
            <h5 class="font-heading text-md">Ejemplo de H5</h5>
            <h6 class="font-heading text-sm">Ejemplo de H6</h6>
          </div>
        </div>
        <div class="p-4 border rounded">
          <h3 class="text-xl mb-2">Poppins (Base)</h3>
          <p>Esta es la tipografía base Poppins para textos normales.</p>
          <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No se necesita lógica adicional para este componente
</script> 