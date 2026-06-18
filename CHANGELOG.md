# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2026-06-18

### Added

- Bilingual README (English + Chinese) with NPM badges
- MIT LICENSE file
- `Plugin` type export and named export in `index.ts`
- `prepublishOnly` script for auto-build on publish
- Dynamic `holderId` to support multiple editor instances

### Changed

- **BREAKING**: Migrate build system from Webpack to Vite (lib mode with ES/CJS/UMD output)
- **BREAKING**: Rewrite `Editor.vue` with `<script setup lang="ts">`
- Set `"type": "module"` for ESM-first package
- Update `package.json` exports field for dual ESM/CJS support
- Simplify props: `config` + 5 shortcut props (`holder`, `placeholder`, `autofocus`, `readOnly`, `tools`)
- Add `defineExpose` for `save()` and `render()` methods
- Update `tsconfig.json` for Vite compatibility
- Move `demo/index.html` to root for Vite entry
- Remove `dist/` from git tracking (added to `.gitignore`)

### Removed

- Webpack configs (`webpack.dev.js`, `webpack.pord.js`) and `.babelrc`
- Legacy demo files (`demo/demo.html`, `demo/shims-vue.d.ts`)
- Bundled dist files from git (`vue-editorjs.js`, `vue-editorjs.min.js`)
