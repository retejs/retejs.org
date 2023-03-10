<template lang="pug">
.container(ref="container")
  Pointer.pointer(
    v-for="pointer in pointers"
    :length="pointer.len"
    :size="16"
    :x="pointer.x"
    :y="pointer.y"
    :rotate="pointer.r"
    :title="pointer.title"
    :scale="scale * 0.7 + 0.3"
  )
</template>

<script>
import { NodeEditor, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { VueRenderPlugin, Presets } from 'rete-vue-render-plugin';
import { DataflowEngine } from 'rete-engine';
import Pointer from '@/components/shared/Pointer.vue';

const socket = new ClassicPreset.Socket('Number');

class NumberNode extends ClassicPreset.Node {
  constructor(initial) {
    super('Number');

    this.addControl('value', new ClassicPreset.InputControl('number', { initial }));
    this.addOutput('value', new ClassicPreset.Output(socket, 'Number'));
  }

  data() {
    return {
      value: this.controls.value.value,
    };
  }
}

class AddNode extends ClassicPreset.Node {
  constructor() {
    super('Add');

    this.addControl('value', new ClassicPreset.InputControl('number'));
    this.addInput('a', new ClassicPreset.Input(socket, 'Left'));
    this.addInput('b', new ClassicPreset.Input(socket, 'Right'));
    this.addOutput('value', new ClassicPreset.Output(socket, 'Number'));
  }

  data(inputs) {
    const value = (inputs.a || [0])[0] + (inputs.b || [0])[0];

    this.controls.value.setValue(value);

    return {
      value,
    };
  }
}
export default {
  data() {
    return {
      pointers: [],
      scale: 1,
    };
  },
  async mounted() {
    this.$refs.container.innterHTML = '';

    const editor = new NodeEditor();
    const area = new AreaPlugin(this.$refs.container);
    const render = new VueRenderPlugin();
    const engine = new DataflowEngine();

    render.addPreset(Presets.classic.setup({ area }));

    editor.use(area);
    editor.use(engine);
    area.use(render);

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), { accumulating: AreaExtensions.accumulateOnCtrl() });
    AreaExtensions.simpleNodesOrder(area);

    const a = new NumberNode(1);
    const b = new NumberNode(1);

    const add = new AddNode();

    editor.addPipe((context) => {
      if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
        engine.fetch(add.id);
      }

      return context;
    });

    await editor.addNode(a);
    await editor.addNode(b);
    await editor.addNode(add);

    await editor.addConnection(new ClassicPreset.Connection(a, 'value', add, 'a'));
    await editor.addConnection(new ClassicPreset.Connection(b, 'value', add, 'b'));

    await area.translate(a.id, { x: 50, y: 20 });
    await area.translate(b.id, { x: 45, y: 240 });
    await area.translate(add.id, { x: 435, y: 20 });

    area.emit({ type: 'nodepicked', data: { id: add.id } });

    this.updatePointers(area, a, add);

    area.addPipe((ctx) => {
      if (ctx.type === 'zoomed' || ctx.type === 'translated' || ctx.type === 'nodetranslated') {
        this.updatePointers(area, a, add);
      }
      return ctx;
    });

    area.area.zoom(0.92);
  },
  methods: {
    updatePointers(area, nodeA, nodeAdd) {
      const aPosition = area.nodeViews.get(nodeA.id).position;
      const addPosition = area.nodeViews.get(nodeAdd.id).position;
      const { k, x, y } = area.area.transform;

      this.pointers = [];
      this.pointers.push({
        len: 5,
        x: k * (aPosition.x + 55) + x,
        y: k * (aPosition.y + 95) + y,
        r: 125,
        title: 'Control',
      });
      this.pointers.push({
        len: 3,
        x: k * (aPosition.x + 185) + x,
        y: k * (aPosition.y + 60) + y,
        r: 45,
        title: 'Socket',
      });

      this.pointers.push({
        len: 3,
        x: k * (addPosition.x + 185) + x,
        y: k * (addPosition.y + 50) + y,
        r: -50,
        title: 'Output',
      });

      this.pointers.push({
        len: 3,
        x: k * (addPosition.x + -5) + x,
        y: k * (addPosition.y + 135) + y,
        r: 150,
        title: 'Input',
      });
      this.pointers.push({
        len: 8,
        x: k * (addPosition.x + 120) + x,
        y: k * (addPosition.y + 165) + y,
        r: 120,
        title: 'Node',
      });
      this.scale = k;
    },
  },
  components: {
    Pointer,
  },
};

</script>

<style lang="sass">
.container
  width: 700px
  height: 400px
  line-height: 1.2em
  position: relative
  .pointer
    z-index: 2

</style>
