<template lang="pug">
.canva(ref="canva")
  client-only
    template(#placeholder)
      .ssr
        .caption Preview needs JS to be enabled
  .container.structures-editor(ref="container")
</template>

<script setup lang="ts">
import {
  onMounted, onUnmounted, ref
} from 'vue'

import { createEditor, methodApplicant,
  structuresGraph, structuresSubGraph } from '../../shared/editor'

interface Props {
  id: string
  pick?: string
}

const props = defineProps<Props>()

const canva = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
let resizeHandler: (() => void) | null = null
let instance: any = null

function concealNodes(editor: any, area: any, data: any) {
  const nodes = data.nodes().map((n: any) => n.id)
  const conns = data.connections().map((c: any) => c.id)

  editor.getNodes().forEach((n: any) => {
    const { classList: nodeClassList } = area.nodeViews.get(n.id).element

    if (nodes.includes(n.id)) {
      nodeClassList.remove('conceal')
    } else {
      nodeClassList.add('conceal')
    }
  })
  editor.getConnections().forEach((c: any) => {
    const { classList: connectionClassList } = area.connectionViews.get(c.id).element

    if (conns.includes(c.id)) {
      connectionClassList.remove('conceal')
    } else {
      connectionClassList.add('conceal')
    }
  })
}

onMounted(async () => {
  instance = await createEditor(container.value!, {
    multiselect: false,
    order: false,
    onSelect(label: string, id: string) {
      concealNodes(editor, area, method.execute(id))
    }
  })
  const {
    area, editor, resize, nodeSelector
  } = instance
  const method = methodApplicant(editor, props.id)

  const { nodes } = method.graphType === 'default'
    ? await structuresGraph(instance)
    : await structuresSubGraph(instance)

  resizeHandler = () => {
    resize(canva.value!.clientWidth, 900)
  }

  area.area.setDragHandler(null)
  resizeHandler()

  if (props.pick) {
    nodeSelector.select(nodes[props.pick as keyof typeof nodes].id)
  } else {
    concealNodes(editor, area, method.execute())
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (instance) instance.area.destroy()
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="sass" scoped>
@use 'sass:math'
@import '@/assets/styles/media.sass'

$ratio: math.div(15, 45)
$size: 35em

.canva
  max-width: $size
  max-height: $ratio * $size
  width: 65vw
  height: $ratio * 65vw
  +phone
    width: 85vw
    height: $ratio * 85vw
  .ssr
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
</style>

<style lang="sass">
.structures-editor
  .conceal
    opacity: 0.6
</style>
