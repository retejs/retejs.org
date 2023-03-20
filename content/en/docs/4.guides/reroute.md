# Reroute


::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::


#### Устанавливаем зависимости

```bash
npm i rete-connection-reroute-plugin@next
```

#### Подключение плагина

```ts
import { ReroutePlugin, RerouteExtra } from "rete-connection-reroute-plugin";

type AreaExtra = ReactArea2D<Schemes> | RerouteExtra<Schemes>;

const reroutePlugin = new ReroutePlugin<Schemes, AreaExtra>();

render.use(reroutePlugin)
```

Плагин подключен, но еще нужно подключить пресет для визуализации

#### Визуализация

На данный момент доступна визуализация контекстного меню только с помощью `rete-react-render-plugin`

```ts
render.addPreset(Presets.reroute.setup({
  contextMenu(id) {
    reroutePlugin.remove(id);
  },
  translate(id, dx, dy) {
    const { k } = area.area.transform;

    reroutePlugin.translate(id, dx / k, dy / k);
  }
}));
```

#### Выбираемые пины {#selectable}

Как уже было описано в гайде [Selectable](./selectable), вы можете настроить выбор любого вида элементов.

Для добавления пинов в систему выбора нам нужен следующий код

```ts
import { RerouteExtensions } from "rete-connection-reroute-plugin";

const selector = AreaExtensions.selector();
const accumulating = AreaExtensions.accumulateOnCtrl();

AreaExtensions.selectableNodes(area, selector, { accumulating });
RerouteExtensions.selectablePins(reroutePlugin, selector, accumulating);

render.addPreset(Presets.reroute.setup({
  pointerdown(id) {
    reroutePlugin.unselect(id);
    reroutePlugin.select(id);
  },
  // keep contextMenu and translate from the code above
}));

```

где
- `RerouteExtensions.selectablePins` это небольшое расширение, которое отвечает за добавление/удаление пинов в реестр выбранных их перемещение
- `pointerdown` срабатывает при нажатии на пин и помечает его как выбранный

Готовый результат вы можете найти на странице примера [Reroute](/examples/reroute)
