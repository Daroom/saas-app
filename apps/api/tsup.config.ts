import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'build',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  target: 'node16',
  external: [
    '@prisma/client',
    'prisma'
  ],
  noExternal: ['@saas-app/database'],
  skipNodeModulesBundle: true,
  bundle: true,
  treeshake: true
})