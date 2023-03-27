<template>
<div class="root" :style="rootStyles">
  <svg :width="size * length" :height="size" :style="svgStyles" xmlns="http://www.w3.org/2000/svg">
  <g id="Layer_1">
    <title>Layer 1</title>
    <ellipse filter="url(#blur)" :ry="r" :rx="r" :cy="cy" :cx="cx" fill="#fff"/>
    <path  filter="url(#blur)" :d="path" fill="#fff"/>
    <ellipse :ry="r" :rx="r" :cy="cy" :cx="cx" fill="#6a6a6a"/>
    <path  :d="path" fill="#6a6a6a"/>
  </g>
  <defs>
    <filter height="200%" width="200%" y="-50%" x="-50%" id="blur">
    <feGaussianBlur :stdDeviation="size * 0.2" in="SourceGraphic"/>
    </filter>
  </defs>
  </svg>
<div class="title" :style="titleStyles">{{title}}</div>
</div>
</template>

<script>
export default {
  props: ['length', 'size', 'x', 'y', 'rotate', 'title', 'scale'],
  computed: {
    cx() {
      return this.size / 2;
    },
    cy() {
      return this.size / 2;
    },
    r() {
      return this.size * 0.4;
    },
    offset() {
      return this.size * 0.3;
    },
    path() {
      return `M ${this.cx} ${this.offset} L ${this.cx} ${this.size - this.offset} L ${this.length * this.size} ${this.cy} Z`;
    },
    rootStyles() {
      return {
        left: `${this.x - this.cx * this.scale}px`,
        top: `${this.y - this.cy * this.scale}px`,
        transform: `scale(${this.scale})`,
      };
    },
    svgStyles() {
      return {
        transformOrigin: `${this.cx}px ${this.cy}px`,
        transform: `rotate(${this.rotate}deg)`,
      };
    },
    titleStyles() {
      const rotatePointAroundEllipse = (point, angle) => {
        const [x1, y1] = point;
        const theta = angle * Math.PI / 180;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        const x2 = x1 * cos - y1 * sin;
        const y2 = x1 * sin + y1 * cos;
        return [x2, y2];
      };

      const x0 = this.length * this.size + 5;
      const y0 = 0;
      const [x1, y1] = rotatePointAroundEllipse([x0, y0], this.rotate);
      const r = (this.rotate + 360) % 360;
      const offset = r > 180 ? (360 - r) / 180 : r / 180;

      return {
        left: `${x1}px`,
        top: `${y1}px`,
        transform: `translate(${-offset * 100}%, 0%)`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.root
  position: absolute
  svg
    position: absolute
  .title
    position: absolute
    white-space: nowrap
    font-size: 22px
    color: #727272
</style>
