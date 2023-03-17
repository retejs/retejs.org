# Connection path

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

```bash
npm i rete-connection-path-plugin@next d3-shape
```

#### Подключаем плагин

В данном случае все соединения будут использовать `curveStep`
Также заметьте, что плагин подключается к рендер плагину, который должен выкидывать событие `connectionpath`

```ts
import { ConnectionPathPlugin } from "rete-connection-path-plugin";
import { curveStep } from "d3-shape";

const pathPlugin = new ConnectionPathPlugin<Schemes, Area2D<Schemes>>({
  curve: () => curveStep
});

render.use(pathPlugin);
```

#### Connection-specific path

Опция `curve` принимает колбэк, первым параметром которого является экземпляр соединения, в котором вы можете задать тип пути

```ts
import { curveStep, curveMonotoneX, curveLinear, CurveFactory } from "d3-shape";

class Connection extends ClassicPreset.Connection<
  ClassicPreset.Node,
  ClassicPreset.Node
> {
  curve?: CurveFactory;
}

const pathPlugin = new ConnectionPathPlugin<Schemes, Area2D<Schemes>>({
  curve: (connection) => connection.curve || curveStep
});

const monotoneConnection = new Connection(a, "port", b, "port");
const linearConnection = new Connection(a, "port", b, "port");

monotoneConnection.curve = curveMonotoneX;
linearConnection.curve = curveLinear;
```

Готовый результат вы можете найти на странице примера [Connection path](/examples/connection-path)
