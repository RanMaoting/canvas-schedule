import type { Options } from '../typings'
import { Leafer, Rect } from 'leafer-editor'
import { ref } from 'vue'

export function useSideEdge(props: Options) {
  const sideContainer = ref<HTMLDivElement>()
  // const {} = use

  let sideInstance: Leafer
  function initSide() {
    sideInstance = new Leafer({
      view: sideContainer.value!,
      type: 'draw',
    })
    const rect = new Rect({
      x: 0,
      y: 0,
      width: 150,
      height: 200,
      fill: '#32cd79', // 背景色
    })
    sideInstance.add(rect)
  }
  return {
    initSide,
    sideContainer,
  }
}
