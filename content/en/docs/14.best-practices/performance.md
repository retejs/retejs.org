# Performance

In client applications, you may frequently encounter two issues: resource-intensive operations and low FPS. The former is caused by synchronous operations such as executing resource-intensive JS code or some browser APIs that block the main thread. The latter is often attributed to the direct rendering of elements by the browser - the more complex and numerous they are, the more time it takes for the browser to create the layout and render them.

In the context of this framework, the following approaches can be adopted to minimize the impact of the aforementioned issues:

## Connect plugins only when needed

In the case of transforming a graph where intermediate results aren't visualized, it may be unnecessary to connect additional plugins. Instead, copy the transformed result to a new editor that already has all required plugins connected.


## Simplifying nodes at a specific zoom level

This technique is particularly useful when visualizing a large number of nodes. In such cases, the bottleneck is typically the browser's rendering of elements when all nodes are visible in the viewport

Usually, if many nodes are displayed in the viewport, the zoom level is quite low and each node occupies a relatively small area. Consequently, these nodes can be replaced with content-free rectangles of the same size, reducing the cost of rendering while maintaining a good UX

The LOD (Level of Detail) technique, commonly used in 3D visualization, can also be applied here. Check out the [LOD](/examples/lod) example.


