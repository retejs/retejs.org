import {
  NodeEditor, ClassicPreset, GetSchemes, NodeId,
} from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { VuePlugin, Presets, VueArea2D } from 'rete-vue-plugin';
import { DataflowEngine } from 'rete-engine';

import { structures } from 'rete-structures';
import { SelectorEntity } from 'rete-area-plugin/_types/extensions/selectable';

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

class NamelessNode extends ClassicPreset.Node {
  parent?: string

  constructor(public width = 180, public height = 100) {
    super('');

    this.addInput('port', new ClassicPreset.Input(socket));
    this.addOutput('port', new ClassicPreset.Output(socket));
  }

  data() {
    return {};
  }
}

type OnSelect = (label: string, id: string, accumulate: boolean) => void
class Selector extends AreaExtensions.Selector<SelectorEntity> {
  constructor(private onSelect?: OnSelect) {
    super();
  }

  add(entity: SelectorEntity, accumulate: boolean): void {
    super.add(entity, accumulate);
    if (this.onSelect) this.onSelect(entity.label, entity.id, accumulate);
  }
}

type NodeProps = NumberNode | AddNode | NamelessNode

class Connection<N extends NodeProps> extends ClassicPreset.Connection<N, N> { }

type Schemes = GetSchemes<NodeProps, Connection<NodeProps>>
type AreaExtra = VueArea2D<Schemes>

export async function createEditor(container: HTMLElement, props: { multiselect: boolean, order: boolean, onSelect?: OnSelect }) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const render = new VuePlugin<Schemes, AreaExtra>();
  const engine = new DataflowEngine<Schemes>();

  area.area.setZoomHandler(null);
  area.container.style.overflow = 'initial';

  render.addPreset(Presets.classic.setup());

  editor.use(area);
  editor.use(engine);
  area.use(render);

  const selector = new Selector(props.onSelect);
  const nodeSelector = AreaExtensions.selectableNodes(area, selector, {
    accumulating: props.multiselect ? AreaExtensions.accumulateOnCtrl() : { active: () => false },
  });
  if (props.order) {
    AreaExtensions.simpleNodesOrder(area);
  }

  return {
    editor,
    area,
    engine,
    nodeSelector,
    resize(width: number, graphWidth: number) {
      area.area.zoom(width / graphWidth);
    },
  };
}

type EditorInstance = Awaited<ReturnType<typeof createEditor>>

export async function introductionGraph({ editor, area, engine }: EditorInstance) {
  const add = new AddNode();

  async function process() {
    engine.reset();
    await engine.fetch(add.id);
    area.update('control', (add.controls.value as ClassicPreset.InputControl<'number'>).id);
  }

  editor.addPipe((context) => {
    if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
      process();
    }

    return context;
  });

  const a = new NumberNode(1, process);
  const b = new NumberNode(1, process);

  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(add);

  await editor.addConnection(new ClassicPreset.Connection(a, 'value', add, 'a'));
  await editor.addConnection(new ClassicPreset.Connection(b, 'value', add, 'b'));

  await area.translate(a.id, { x: 50, y: 20 });
  await area.translate(b.id, { x: 45, y: 240 });
  await area.translate(add.id, { x: 435, y: 20 });

  return {
    nodes: { a, b, add },
  };
}

export async function structuresGraph({ editor, area }: EditorInstance) {
  const a = new NamelessNode();
  const b = new NamelessNode();
  const c = new NamelessNode();
  const d = new NamelessNode();
  const e = new NamelessNode();
  const f = new NamelessNode();
  const g = new NamelessNode();

  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(c);
  await editor.addNode(d);
  await editor.addNode(e);
  await editor.addNode(f);
  await editor.addNode(g);

  await area.translate(a.id, { x: 0, y: 70 });
  await area.translate(b.id, { x: 0, y: 200 });
  await area.translate(c.id, { x: 230, y: 10 });
  await area.translate(d.id, { x: 230, y: 140 });
  await area.translate(e.id, { x: 460, y: 40 });
  await area.translate(f.id, { x: 710, y: 0 });
  await area.translate(g.id, { x: 710, y: 130 });

  await editor.addConnection(new ClassicPreset.Connection(a, 'port', c, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(b, 'port', d, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(a, 'port', d, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(c, 'port', e, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(d, 'port', e, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(e, 'port', f, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(e, 'port', g, 'port'));

  return {
    nodes: {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
    },
  };
}

export async function structuresSubGraph({ editor, area }: EditorInstance) {
  const rootParent = new NamelessNode(550, 290);
  const nestedParent = new NamelessNode(470, 140);
  const a = new NamelessNode();
  const b = new NamelessNode();
  const c = new NamelessNode();
  const d = new NamelessNode();

  nestedParent.parent = rootParent.id;
  a.parent = nestedParent.id;
  b.parent = nestedParent.id;
  c.parent = rootParent.id;

  await editor.addNode(rootParent);
  await editor.addNode(nestedParent);
  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(c);
  await editor.addNode(d);

  await area.translate(rootParent.id, { x: 0, y: 0 });
  await area.translate(nestedParent.id, { x: 20, y: 20 });
  await area.translate(a.id, { x: 50, y: 40 });
  await area.translate(b.id, { x: 280, y: 40 });
  await area.translate(c.id, { x: 350, y: 175 });
  await area.translate(d.id, { x: 650, y: 50 });

  await editor.addConnection(new ClassicPreset.Connection(rootParent, 'port', d, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(c, 'port', d, 'port'));
  await editor.addConnection(new ClassicPreset.Connection(a, 'port', b, 'port'));

  return {
    nodes: {
      rootParent,
      nestedParent,
      a,
      b,
      c,
      d,
    },
  };
}

export function methodApplicant(editor: NodeEditor<Schemes>, id: string) {
  const graphType = ['children', 'parent', 'descendants', 'ancestors', 'orphans', 'siblings'].includes(id)
    ? 'subgraph' as const
    : 'default' as const;

  return {
    graphType,
    execute: (pickedNodeId: null | NodeId = null) => {
      if (id === 'roots') return structures(editor).roots();
      if (id === 'leaves') return structures(editor).leaves();
      if (id === 'filter') return structures(editor).filter(Boolean, ({ source, target }) => source === pickedNodeId || target === pickedNodeId);
      if (id === 'orphans') return structures(editor).orphans();

      if (!pickedNodeId) throw new Error('pickedNode required');

      if (id === 'incomers') return structures(editor).incomers(pickedNodeId);
      if (id === 'outgoers') return structures(editor).outgoers(pickedNodeId);
      if (id === 'successors') return structures(editor).successors(pickedNodeId);
      if (id === 'predecessors') return structures(editor).predecessors(pickedNodeId);

      const context = {
        nodes: [editor.getNode(pickedNodeId)],
        connections: [],
      };

      if (id === 'union') return structures(editor).union(context);
      if (id === 'difference') return structures(editor).difference(context);
      if (id === 'intersection') return structures(editor).intersection(context);

      if (id === 'children') return structures(editor).children((n) => n.id === pickedNodeId);
      if (id === 'parent') return structures(editor).parents((n) => n.id === pickedNodeId);
      if (id === 'descendants') return structures(editor).descendants((n) => n.id === pickedNodeId);
      if (id === 'ancestors') return structures(editor).ancestors((n) => n.id === pickedNodeId);
      if (id === 'siblings') return structures(editor).siblings((n) => n.id === pickedNodeId);

      return structures(editor);
    },
  };
}
