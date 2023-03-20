# Comments

::alert
Этот гайд основан на гайде [Basic](./basic). Желательно ознакомиться с ним для полноценного понимания текущего гайда
::

#### Устанавливаем зависимости

```bash
npm i rete-comment-plugin@next
```

#### Подготавливаем узлы

```ts
class Node extends ClassicPreset.Node {
  width = 180;
  height = 140;
}
class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<Node, Connection<Node>>;
```

#### Подключаем плагин

```ts
import { CommentPlugin } from "rete-comment-plugin";

const comment = new CommentPlugin<Schemes, AreaExtra>();

area.use(comment);
```

#### Добавляем комментарии программно

Adding inline comment

```ts
comment.addInline("Inline comment text", [360, -20], node.dd);
```

где `[360, -20]` это позиция комментария, поскольку он может быть размещен произвольно относительно узла `node`, к которому присоединяется

Adding frame comment

```ts
comment.addFrame("Frame comment text", [node.id]);
```

где `[node.id]` это перечень узлов, которые покрывает этот комментарий

#### Выбираемые комментарии {#selectable}

```ts
import { CommentExpressions } from "rete-comment-plugin";

const selector = AreaExtensions.selector();
const accumulating = AreaExtensions.accumulateOnCtrl();

CommentExpressions.selectable(comment, selector, accumulating);
```

#### Edit comment text

Чтобы изменить текст комментария, пользователь может вызвать контекстное меню. По умолчанию он увидит промпт с полем ввода, но вы можете кастомизировать это

```ts
const comment = new CommentPlugin<Schemes, AreaExtra>({
  edit: async (comment) => {
    return prompt('Edit comment', comment.text)
  }
});
```

где свойство `edit` должен принимать асинхронную функцию, которая возвращает текст комментария
