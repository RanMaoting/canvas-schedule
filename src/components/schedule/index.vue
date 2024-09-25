<script setup lang="ts">
import type { Options } from './typings'
import { App, Group, Leafer, MoveEvent, Rect, Text } from 'leafer-editor'
import { onMounted, onUnmounted, ref } from 'vue'
import { Ruler } from './Ruler'
import { Ruler as RulerCopy } from './Ruler copy'

const props = defineProps<Options>()

const sideContainer = ref<HTMLDivElement>()
onMounted(() => {
  const app = new App({
    view: sideContainer.value,
    // 会自动创建 editor实例、tree层、sky层
    editor: {},
    zoom: {
      min: 0.1,
      max: 2,
    },
  })

  for (let i = 0; i < 50; i++) {
    for (let index = 0; index < 50; index++) {
      const group = new Group()
      group.add(new Rect({
        x: index * 50,
        y: i * 50,
        width: 50,
        height: 50,
        fill: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        // cornerRadius: [ 50, 80, 0, 80],
        editable: true,
      }))
      group.add(new Text({
        text: `${i}-${index}`,
        x: index * 50,
        y: i * 50,
        fill: 'white',
      }))

      app.tree.add(group)
    }
  }

  app.zoomLayer.x = 150
  app.zoomLayer.y = 25

  new Ruler(app)
  // new RulerCopy(app)
  // app.on(MoveEvent.BEFORE_MOVE, (event) => {
  //   app.zoomLayer.x = 0

  //   return false
  // })
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
