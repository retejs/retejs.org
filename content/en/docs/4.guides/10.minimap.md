# Minimap

::alert
This guide is based on the [Basic](./basic) guide. It is recommended to review it for a comprehensive understanding of this guide.
::

#### Install dependencies

```bash
npm i rete-minimap-plugin@next
```

#### Prepare nodes

Predefined node sizes are necessary for the minimap plugin as they are displayed on the minimap with their respective dimensions.

```ts
class Node extends ClassicPreset.Node {
  width = 190;
  height = 120;
}
class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<Node, Connection<Node>>;
```

#### Connect the plugin

```ts
import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";

const minimap = new MinimapPlugin<Schemes, AreaExtra>();

area.use(minimap);
```

But this is not sufficient as the render plugin is responsible for visualization

#### Rendering the minimap

Currently, the visualization of the minimap is only possible using the `rete-react-render-plugin`

```ts
import { ReactRenderPlugin, Presets } from "rete-react-render-plugin";

render.addPreset(Presets.minimap.setup({ size: 200 }));
```

Check out the complete result on the [Minimap](/examples/minimap) example page.
