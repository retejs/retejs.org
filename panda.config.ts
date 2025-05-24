import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: "styled",
});
