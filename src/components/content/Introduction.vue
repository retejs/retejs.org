<template lang="pug">
.canva(ref="canva")
  client-only
    template(#placeholder)
      img.placeholder(src="~/assets/images/introduction.png")
  .container(ref="container")
    Pointer.pointer(
      v-for="pointer in pointers"
      :length="pointer.len"
      :size="16"
      :x="pointer.x"
      :y="pointer.y"
      :rotate="pointer.r"
      :title="pointer.title"
      :scale="scale"
    )
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { createEditor, introductionGraph } from '../../shared/editor';
import Pointer from '@/components/shared/Pointer.vue';

export default {
  setup() {
    const canva = ref(null);
    const container = ref(null);
    const pointers = ref([]);
    const scale = ref(1);

    function updatePointers(area, nodeA, nodeAdd) {
      const aPosition = area.nodeViews.get(nodeA.id).position;
      const addPosition = area.nodeViews.get(nodeAdd.id).position;
      const { k, x, y } = area.area.transform;

      pointers.value = [];
      pointers.value.push({
        len: 5,
        x: k * (aPosition.x + 65) + x,
        y: k * (aPosition.y + 92) + y,
        r: 125,
        title: 'Control',
      });
      pointers.value.push({
        len: 3,
        x: k * (aPosition.x + 185) + x,
        y: k * (aPosition.y + 60) + y,
        r: 45,
        title: 'Socket',
      });

      pointers.value.push({
        len: 3,
        x: k * (addPosition.x + 185) + x,
        y: k * (addPosition.y + 50) + y,
        r: -50,
        title: 'Output',
      });

      pointers.value.push({
        len: 3,
        x: k * (addPosition.x + -5) + x,
        y: k * (addPosition.y + 135) + y,
        r: 150,
        title: 'Input',
      });
      pointers.value.push({
        len: 8,
        x: k * (addPosition.x + 120) + x,
        y: k * (addPosition.y + 165) + y,
        r: 120,
        title: 'Node',
      });
      scale.value = k;
    }
    let resizeHandler = null;
    let instance = null;

    onMounted(async () => {
      instance = await createEditor(container.value, {
        multiselect: true,
        order: true,
      });
      const { area, resize, nodeSelector } = instance;
      const { nodes } = await introductionGraph(instance);
      resizeHandler = () => resize(canva.value.clientWidth, 706);

      nodeSelector.select(nodes.add.id);
      resizeHandler();
      updatePointers(area, nodes.a, nodes.add);

      area.addPipe((ctx) => {
        if (ctx.type === 'zoomed' || ctx.type === 'translated' || ctx.type === 'nodetranslated') {
          updatePointers(area, nodes.a, nodes.add);
        }
        return ctx;
      });

      window.addEventListener('resize', resizeHandler);
    });
    onUnmounted(() => {
      if (instance) instance.area.destroy();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    });
    return {
      canva,
      container,
      pointers,
      scale,
    };
  },
  components: {
    Pointer,
  },
};

</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

$size: 650px
$ratio: 350px / $size

.canva
  max-height: $size * $ratio
  max-width: $size
  height: $ratio * 65vw
  width: 65vw
  position: relative
  +phone
    height: $ratio * 90vw
    width: 90vw

  .container
    position: absolute
    width: 100vw
    height: 100%
    left: 0
    top: 0
    line-height: 1.2em
    z-index: 0
    overflow: hidden
    .pointer
      z-index: 2

  img.placeholder
    width: 100%
    height: 100%
    margin: 0

</style>
