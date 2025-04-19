<template>
    <div class="p-8 bg-white prose ">
      <h2 class="text-2xl font-bold mb-4">Ejemplo de @tailwindcss/typography</h2>
      
      <article class="prose max-w-none">
        <h1>Título principal del artículo</h1>
        <p>Este es un párrafo con <a class="prose-a font-base" href="#">un enlace</a> estilizado automáticamente.</p>
        <h2>Subtítulo del artículo</h2>
        <p>Los párrafos tendrán el espaciado y márgenes correctos.</p>
        <ul>
          <li>Elemento de lista 1</li>
          <li>Elemento de lista 2</li>
          <li>Elemento de lista 3 con <a href="#">un enlace</a></li>
        </ul>
        <blockquote>
          <p>Esta es una cita que tendrá estilos especiales.</p>
        </blockquote>
        <p>Más texto para mostrar el comportamiento de los párrafos.</p>
      </article>
    </div>
  </template>