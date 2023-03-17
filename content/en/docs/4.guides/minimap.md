# Minimap

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

```bash
npm i rete-minimap-plugin@next
```

#### Подготавливаем узлы

Плагину миникарты необходимы предопределенные размеры узлов, поскольку на миникате они отображены с соблюдением размеров

```ts
class Node extends ClassicPreset.Node {
  width = 190;
  height = 120;
}
class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<Node, Connection<Node>>;
```

#### Подключаем плагин

```ts
import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";

const minimap = new MinimapPlugin<Schemes, AreaExtra>();

area.use(minimap);
```

Но этого еще не достаточно, поскольку визуализацией должен заниматься рендер плагин

#### Визуализируем миникарту

На данный момент доступна визуализация миникарты только с помощью `rete-react-render-plugin`

```ts
import { ReactRenderPlugin, Presets } from "rete-react-render-plugin";

render.addPreset(Presets.minimap.setup({ size: 200 }));
```

Готовый результат вы можете найти на странице примера [Minimap](/examples/minimap)
