import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import minifyHTML from "@lit-labs/rollup-plugin-minify-html-literals";

// Determine if we are in watch mode (development)
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "../www/bundle.js",
    format: "iife",
    name: "DashBouncer",
  },
  watch: {
    clearScreen: false,
    include: "src/**",
    exclude: "node_modules/**",
  },
  plugins: [
    production && minifyHTML(),
    nodeResolve(),
    typescript({
      ...(production && { noEmitOnError: true }),
    }),
    !production && livereload("../www/"),
    production && terser(),
  ],
};
