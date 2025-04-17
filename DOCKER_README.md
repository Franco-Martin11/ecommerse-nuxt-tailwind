# Configuración de Docker para el Proyecto E-commerce Nuxt

Este proyecto incluye una configuración Docker que permite levantar tanto la base de datos PostgreSQL como el frontend Nuxt en contenedores.

## Requisitos previos

- Docker instalado en tu sistema
- Docker Compose instalado en tu sistema

## Estructura de archivos

- `Dockerfile`: Configuración para construir la imagen del frontend
- `docker-compose.yml`: Orquestación de servicios (frontend y base de datos)

## Instrucciones de uso

### Iniciar los servicios

```bash
docker-compose up -d
```

Este comando iniciará los siguientes servicios:
- Base de datos PostgreSQL (accesible en localhost:5432)
- Frontend Nuxt (accesible en localhost:3000)

### Ver logs de los servicios

```bash
docker-compose logs -f
```

### Detener los servicios

```bash
docker-compose down
```

### Eliminar volúmenes y reiniciar desde cero

```bash
docker-compose down -v
```

## Configuración de la base de datos

- Usuario: postgres
- Contraseña: 0798
- Nombre de la base de datos: ecommerce-nuxt
- Puerto: 5432

## Notas adicionales

- Los datos de la base de datos se persisten en un volumen de Docker
- El frontend se construye y se ejecuta en modo de producción
- La conexión entre el frontend y la base de datos está configurada automáticamente 