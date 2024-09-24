<script setup lang="ts">
import type { Options } from './typings'
import { App, Leafer, MoveEvent, Rect } from 'leafer-editor'
import { onMounted, onUnmounted, ref } from 'vue'
import { Ruler } from './Ruler'

const props = defineProps<Options>()

const sideContainer = ref<HTMLDivElement>()
onMounted(() => {
  const app = new App({
    view: sideContainer.value,
    // 会自动创建 editor实例、tree层、sky层
    editor: {},
  })

  const rect = new Rect({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: '#32cd79',
    // cornerRadius: [ 50, 80, 0, 80],
    editable: true,
  })

  app.tree.add(rect)
  // app.zoomLayer.x = 50
  // app.zoomLayer.y = 50

  // new Ruler(app)
  app.on(MoveEvent.BEFORE_MOVE, (event) => {
    app.zoomLayer.x = 0

    return false
  })
})
onUnmounted(() => {
  const { list } = Leafer
  list.forEach(leafer => (leafer as Leafer).destroy(true))
  list.destroy()
})
</script>

<template>
  <div ref="sideContainer" class="w-full h-full" />
</template>

<style scoped></style>
