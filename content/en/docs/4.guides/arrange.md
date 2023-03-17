---
title: Arrange nodes
---

# Arrange nodes

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

Плагин снован на пир зависимости `elkjs`, поэтому его нужно установить отдельно

```bash
npm i rete-auto-arrange-plugin@next elkjs
```

Кроме этого, возможно вам потребуется установить `web-worker`, если данная зависимость не определяется в вашем сборщике

```bash
npm i web-worker
```

#### Создаем основу узла

Нам необходимо задать ширину и высоту узла, без которых `elkjs` не сможет работать корректно, поскольку нередко размеры узлом могут отличаться

```ts
class Node extends ClassicPreset.Node {
  width = 180;
  height = 120;
}

class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<Node, Connection<Node>>;
```

#### Подключаем плагин

```ts
import { AutoArrangePlugin } from "rete-auto-arrange-plugin";

const arrange = new AutoArrangePlugin<Schemes>();

area.use(arrange);
```

#### Упорядочить добавленные узлы

```ts
await arrange.layout();
```

Готовый результат вы можете найти на странице примера [Arrange](/examples/arrange)
