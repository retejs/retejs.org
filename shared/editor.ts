import { NodeEditor, ClassicPreset, GetSchemes } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { VueRenderPlugin, Presets, VueArea2D } from 'rete-vue-render-plugin';
import { DataflowEngine } from 'rete-engine';

const socket = new ClassicPreset.Socket('Number');

class NumberNode extends ClassicPreset.Node {
  constructor(initial, change) {
    super('Number');

    this.addControl('value', new ClassicPreset.InputControl('number', { initial, change }));
    this.addOutput('value', new ClassicPreset.Output(socket, 'Number'));
  }

  data() {
    return {
      value: (this.controls.value as ClassicPreset.InputControl<'number'>).value,
    };
  }
}

class AddNode extends ClassicPreset.Node {
  constructor() {
    super('Add');

    this.addControl('value', new ClassicPreset.InputControl('number', { readonly: true }));
    this.addInput('a', new ClassicPreset.Input(socket, 'Left'));
    this.addInput('b', new ClassicPreset.Input(socket, 'Right'));
    this.addOutput('value', new ClassicPreset.Output(socket, 'Number'));
  }

  data(inputs) {
    const value = (inputs.a || [0])[0] + (inputs.b || [0])[0];

    (this.controls.value as ClassicPreset.InputControl<'number'>).setValue(value);

    return {
      value,
    };
  }
}

type NodeProps = NumberNode | AddNode

class Connection<N extends NodeProps> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<NodeProps, Connection<NodeProps>>
type AreaExtra = VueArea2D<Schemes>

export async function createEditor(container: HTMLElement, props: { multiselect: boolean, order: boolean }) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const render = new VueRenderPlugin<Schemes>();
  const engine = new DataflowEngine<Schemes>();

  area.area.setZoomHandler(null);
  area.container.style.overflow = 'initial';

  render.addPreset(Presets.classic.setup({ area }));

  editor.use(area);
  editor.use(engine);
  area.use(render);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: props.multiselect ? AreaExtensions.accumulateOnCtrl() : { active: () => false },
  });
  if (props.order) {
    AreaExtensions.simpleNodesOrder(area);
  }

  return {
    editor,
    area,
    engine,
    resize(width: number, graphWidth: number) {
      area.area.zoom(width / graphWidth);
    },
  };
}

export function selectNode(id: NodeId, area: AreaPlugin<Schemes, AreaExtra>) {
  area.emit({ type: 'nodepicked', data: { id } });
}

type EditorInstance = Awaited<ReturnType<typeof createEditor>>

export async function introductionGraph({ editor, area, engine }: EditorInstance) {
  const add = new AddNode();

  async function process() {
    engine.reset();
    await engine.fetch(add.id);
    area.update('control', (add.controls.value as ClassicPreset.InputControl<'number'>).id);
  }

  const a = new NumberNode(1, process);
  const b = new NumberNode(1, process);

  editor.addPipe((context) => {
    if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
      process();
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

  return {
    area,
    nodes: { a, b, add },
    resize(width: number) {
      area.area.zoom(0.92 * width / 650);
    },
  };
}
