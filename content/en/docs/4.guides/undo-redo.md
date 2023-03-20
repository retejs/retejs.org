# Undo/Redo

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

```bash
npm i rete-history-plugin@next
```

#### Подключаем плагин

```ts
import { HistoryPlugin } from "rete-history-plugin";

const history = new HistoryPlugin<Schemes, AreaExtra>();

area.use(history);
```

#### Usage

По умолчанию плагин не отслеживает действия пользователя (например комбинации клавиш), и вы можете самостоятельно реализовать взаимодействие с пользователем, используя методы `undo`/`redo`

```ts
await history.undo()
await history.redo()
```

Или использовать стандартное расширение, которое отслеживает комбинации клавиш `Ctrl+Z`/`Ctrl+Y`

```ts
import { HistoryExtensions } from "rete-history-plugin";

HistoryExtensions.keyboard(history);
```
