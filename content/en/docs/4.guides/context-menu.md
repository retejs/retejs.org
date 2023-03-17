# Context menu

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

```bash
npm i rete-context-menu-plugin@next
```

#### Подготавливаем узлы

Для удобства и переиспользования кода лучшим решением будет создать разные классы узлов, например

```ts
class NodeA extends ClassicPreset.Node {
  constructor(socket: ClassicPreset.Socket) {
    super("NodeA");

    this.addControl("port", new ClassicPreset.InputControl("text", {}));
    this.addOutput("port", new ClassicPreset.Output(socket));
  }
}

/// class NodeA extends ...

type Node = NodeA | NodeB;
type Schemes = GetSchemes<Node, Connection<Node, Node>>;
```

#### Подключение плагина

Самый простой вариант это использовать классический пресет, которому вы можете задать список пунктов с метками и функцией, возвращающей необходимый узел

```ts
import { ContextMenuExtra, ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";

type AreaExtra = ReactArea2D<Schemes> | ContextMenuExtra<Schemes>;

const contextMenu = new ContextMenuPlugin<Schemes, AreaExtra>({
  items: ContextMenuPresets.classic.setup([
    ["NodeA", () => new NodeA(socket)],
    ["NodeB", () => new NodeB(socket)]
  ])
});

area.use(contextMenu);
```

Но этого еще не достаточно, поскольку визуализацией заниматься рендер плагин

#### Визуализируем контекстное меню

На данный момент доступна визуализация контекстного меню только с помощью `rete-react-render-plugin`

```ts
import { ReactRenderPlugin, Presets } from "rete-react-render-plugin";

render.addPreset(Presets.contextMenu.setup());
```

Теперь с помощью клика на свободной области вы можете вызвать меню со списком доступных для созданиях узлов, или удалить существующие при клике на узел.

Готовый результат вы можете найти на странице примера [Context menu](/examples/context-menu)
