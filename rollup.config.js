import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json" assert { type: "json" };

const EXTERNAL = Object.keys(pkg.devDependencies);

export default [
  {
    external: [].concat(EXTERNAL),
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
    ],
  }
];