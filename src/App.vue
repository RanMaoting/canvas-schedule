<script setup lang="ts">
import Schedule from '@/components/schedule/index.vue'
</script>

<template>
  <div class=" w-screen h-screen flex gap-4">
    <div class="w-60 h-full bg-blue flex-none" />
    <div class="flex-none w-[calc(100vw-256px)]">
      <Schedule />
    </div>
  </div>
</template>

<style scoped>

</style>
