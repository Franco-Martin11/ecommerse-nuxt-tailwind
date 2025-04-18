<template>
  <div class="p-8 bg-base-100">
    <h1 class="text-3xl font-bold mb-8 text-primary">Demostración de Fuentes</h1>
    
    <div class="card bg-base-200 shadow-xl mb-8 p-6">
      <h2 class="text-2xl mb-4">Fuente por Defecto (Poppins)</h2>
      <p class="mb-2">Este texto usa la fuente predeterminada del tema, que debería ser Poppins.</p>
      <p class="mb-2 font-bold">Texto en negrita con fuente predeterminada</p>
      <button class="btn btn-accent">Botón con fuente predeterminada</button>
    </div>

    <div class="card bg-base-200 shadow-xl mb-8 p-6">
      <h2 class="text-2xl mb-4 font-montserrat">Font Montserrat</h2>
      <p class="mb-2 font-montserrat">Este texto usa la fuente Montserrat integrada en daisyUI.</p>
      <p class="mb-2 font-montserrat font-bold">Montserrat Bold</p>
      <button class="btn btn-primary font-montserrat">Botón con Montserrat</button>
    </div>
    
    <div class="card bg-base-200 shadow-xl p-6">
      <h2 class="text-2xl mb-4 font-poppins">Font Poppins Explícito</h2>
      <p class="mb-2 font-poppins">Este texto usa la clase font-poppins explícitamente.</p>
      <p class="mb-2 font-poppins font-bold">Poppins Bold</p>
      <button class="btn btn-secondary font-poppins">Botón con Poppins</button>
    </div>
  </div>
</template>

<script setup>
// No se requiere lógica adicional para este componente
</script> 