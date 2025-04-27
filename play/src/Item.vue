<template>
    <div class="item">
        <div class="head" :style="{
            color: 'red',
            fontWeight: 'bold',
            marginBottom: '20px',
            fontSize: '20px'
        }">
            <span>{{ source.index }}</span>
            <span>{{ source.name }}</span>
        </div>
        <div class="body" :style="{ fontSize: '25px' }">
            <span>{{ source.desc }}</span>
        </div>
    </div>

</template>

<script setup lang="ts">
defineProps({
    source: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="scss" scoped></style>