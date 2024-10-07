<template>
    <div>
        <h1 :style="{ color: '#cecece' }">{{ props.title }}</h1>
    </div>
</template>

<script setup lang="ts">
interface HeadingProps {
    title: string
}
const props
    = withDefaults(defineProps<HeadingProps>(), {
        title: 'Sin titulo'
    })
</script>

<style lang="scss" scoped></style>