<script setup lang="ts">
import type { Options } from './typings'
import { ImageManager, Leafer } from 'leafer-editor'
import { onBeforeUnmount, onMounted } from 'vue'
import { useSideEdge } from './hooks'

const props = defineProps<Options>()

const { initSide, sideContainer } = useSideEdge(props)

onMounted(() => {
  initSide()
})

onBeforeUnmount(() => {
  const { list } = Leafer
  list.forEach(leafer => (leafer as Leafer).destroy(true))
  list.destroy()
  ImageManager.destroy()
})
</script>

<template>
  <div class="w-full h-full grid grid-rows-[52px_1fr] grid-cols-[180px_1fr]">
    <div class="bg-blue-500">
      第一行第一列
    </div>
    <div class="bg-green-500">
      第一行第二列
    </div>
    <div ref="sideContainer" class="bg-yellow-500">
      第二行第一列
    </div>
    <div class="bg-purple-500">
      第二行第二列
    </div>
  </div>
</template>

<style scoped>

</style>
