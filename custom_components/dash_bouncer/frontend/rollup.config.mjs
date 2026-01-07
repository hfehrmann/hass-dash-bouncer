import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";

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
  plugins: [nodeResolve(), typescript(), !production && livereload("../www/")],
};
