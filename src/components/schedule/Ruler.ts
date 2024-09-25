import type { App } from 'leafer-editor'
import dayjs from 'dayjs'
import { EditorEvent, Group, LayoutEvent, LeaferEvent, Line, MoveEvent, Rect, ResizeEvent, Text, ZoomEvent } from 'leafer-editor'

const CELL_WIDTH = 100
// 显示的天数
const DAYS = 50

// 资源数

// 当前时间
const now = dayjs().startOf('day')
export class Ruler {
  group = new Group()
  bgGroup = new Group()
  // 横向时间group
  xGroup = new Group()
  // 纵向资源group
  yGroup = new Group()
  constructor(private app: App) {
    this.app.sky.add(this.bgGroup)
    this.app.sky.add(this.group)
    this.group.add(this.xGroup)
    this.group.add(this.yGroup)
    this.listen()
  }

  get enable(): boolean {
    return this.group.visible || false
  }

  set enable(enable: boolean) {
    this.group.visible = enable
    this.drawShape()
  }

  drawShape = () => {
    if (this.enable) {
      // this.group.clear()
      this.drawXRuler()
      this.moveShape()
    }
  }

  // 绘制背景-主要是绘制竖线和横线
  drawRect() {
    this.bgGroup.clear()
    const { width, height } = this.app
    // 背景色
    // 横
    this.bgGroup.add(new Rect({
      width,
      height: 25,
      fill: '#EEE',
      // strokeWidth: 1,
      // stroke: '#ccc',
    }))
    // 竖
    this.bgGroup.add(new Rect({
      width: 150,
      height,
      fill: '#EEE',
      // strokeWidth: 1,
      // stroke: '#ccc',
    }))
    this.bgGroup.add(new Line({
      width,
      strokeWidth: 1,
      stroke: '#ccc',
      x: 0,
      y: 25,
      zIndex: 1,
    }))
    this.bgGroup.add(new Line({
      width: height,
      strokeWidth: 1,
      stroke: '#ccc',
      rotation: 90,
      x: 150,
      y: 0,
      zIndex: 1,
    }))
    // 右上角显示的文字
    this.group.add(new Rect({
      width: 150,
      height: 25,
      fill: '#fff',
    }))
    this.group.add(new Text({
      width: 100,
      height: 25,
      text: '资源',
      fontSize: 12,
      fill: '#333',
      textAlign: 'center',
      verticalAlign: 'middle',
    }))
    this.group.add(new Text({
      width: 50,
      height: 25,
      x: 100,
      y: 0,
      text: '时间',
      fontSize: 12,
      fill: '#333',
      textAlign: 'center',
      verticalAlign: 'middle',
    }))
  }

  // 绘制横向的时间栏
  drawXRuler() {
    const zoom = this.getZoom()
    this.xGroup.clear()
    for (let index = 0; index < DAYS; index++) {
      const rect = new Rect({
        width: CELL_WIDTH * zoom,
        height: 25,
        fill: '#FFF',
        x: index * CELL_WIDTH * zoom,
        strokeWidth: 1,
        stroke: '#eee',
      })
      const text = new Text({
        text: now.add(index, 'day').format('MM/DD'),
        fill: '#333',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: 12,
        x: index * CELL_WIDTH * zoom,
        y: 0,
        width: CELL_WIDTH * zoom,
        height: 25,
        textWrap: 'none',
        textOverflow: 'hide',
      })
      const group = new Group()
      group.add(rect)
      group.add(text)
      this.xGroup.add(group)
    }
  }

  // 绘制纵向的资源栏
  drawYRuler() {
    this.yGroup.clear()
    const group = new Group()
  }

  drawAllShape() {
    this.drawRect()
    this.drawShape()
  }

  moveShape() {
    this.xGroup.x = this.app.zoomLayer.x
  }

  listen() {
    this.app.once(LeaferEvent.VIEW_READY, this.drawAllShape.bind(this))
    // this.app.tree.on(LayoutEvent.AFTER, this.drawShape.bind(this))
    this.app.tree.on(ResizeEvent.RESIZE, this.drawAllShape.bind(this))
    // this.app.editor.on(EditorEvent.SELECT, this.drawShape)
    this.app.tree.on(ZoomEvent.ZOOM, this.drawShape.bind(this))
    this.app.tree.on(MoveEvent.MOVE, this.moveShape.bind(this))
  }

  getZoom(): number {
    if (this.app.tree) {
      if (typeof this.app.tree.scale === 'number') {
        return this.app.tree.scale
      }
      else {
        return 1
      }
    }
    else {
      return 1
    }
  }
}
