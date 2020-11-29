<!-- logo (start) -->
<p align="center">
  <img src=".github/img/logo.svg" width="250px">
</p>

<p align="center">
  <img src=".github/img/banner.svg" width="400px">
</p>
<!-- logo (end) -->

<!-- badges (start) -->
<p align="center">
  <img src="https://img.shields.io/github/package-json/v/sergejcodes/shopify-starterkit?color=%236e78ff">
  <img src="https://img.shields.io/github/package-json/dependency-version/sergejcodes/shopify-starterkit/vue?color=%234fc08d">
  <img src="https://img.shields.io/github/package-json/dependency-version/sergejcodes/shopify-starterkit/tailwindcss?color=%2306b6d4">
</p>
<!-- badges (end) -->

<!-- title / description (start) -->
<h2 align="center">Shopify Theming Kit</h2>

Shopify Theming Kit is a modern development environment for blazing fast Shopify theme development with Liquid, Vue and Tailwind CSS.
This kit provides an easy way to build a custom Shopify theme from scratch. It contains a minimal styled boilerplate as a starting point. Everything is pre-configured and should work out of the box.

> Disclaimer: This project is not affiliated with Shopify Inc., Tailwind Labs Inc. or Vue.org

**TL;DR** Go to [Installing](#installing), then go to [Getting started](#getting-started). Now you're ready start 🔥
<!-- title / description (end) -->

<!-- toc (start) -->
## Table of contents

- [Features](#features)
- [System requirements](#system-requirements)
- [Installing](#installing)
- [Getting started](#getting-started)
- [Deploying](#deploying)
- [CSS preprocessors](#css-preprocessors)
  - [SASS/SCSS](#sassscss)
- [Directories](#directories)
- [Tasks](#tasks)
- [Development environment concepts](#development-environment-concepts)
- [Limitations](#limitations)
<!-- toc (end) -->

<!-- features (start) -->
## Features

- Shopify
  - [Shopify Theme Kit](https://www.npmjs.com/package/@shopify/themekit)
  - Default Shopify theme directory and file structure
  - Quick shopify theme setup on remote store with `npm run shopify:init`
  - Batch of `npm scripts` to run common tasks
- JavaScript
  - [Vue](https://vuejs.org)
  - [Vuex](https://vuex.vuejs.org)
  - [Axios](https://github.com/axios/axios)
  - Extend with any [npm packages](https://www.npmjs.com) 📦
- CSS
  - [Tailwind CSS](https://tailwindcss.com)
  - [PostCSS](https://postcss.org) with [PreCSS](https://github.com/jonathantneal/precss)
  - [SASS / SCSS](https://sass-lang.com) support
- Workflow
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [ESLint](https://eslint.org)
  - [Browserlist](https://github.com/browserslist/browserslist)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [PurgeCSS](https://tailwindcss.com/docs/optimizing-for-production#removing-unused-css)
  - Remote Shopify theme auto-reloading with [reloadr](.config/plugins/reloadr) plugin
  - Auto-loading of Vue `components`, `mixins`, `directives` and `filters` with [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)
  - Clean [config structure](.config/)
  - Easily adjustable/extendable configurations
<!-- features (end) -->

<!-- system requirements (start) -->
## System requirements

- Node.js
- npm or yarn
<!-- system requirements (end) -->

<!-- installing (start) -->
## Installing
Clone or download this repo and run following command(s) with your prefered package manager:

### npm

```shell
$ npm install
```

### yarn

```shell
$ yarn import # migrate package-lock.json to yarn.lock
$ rm package-lock.json # or delete manually
$ yarn install
```

> If you migrated to yarn replace `npm run` with `yarn` when executing upcoming commands.
<!-- installing (end) -->

<!-- getting started (start) -->
## Getting started

1. Get Shopify api access: [Instructions at Theme Kit Docs](https://shopify.github.io/themekit#get-api-access)

2. Initialize theme on Shopify store with credentials from first step. Either for **dev** or **live** environment (You can define both environments one after another):
```shell
$ npm run shopify:init --password [your-api-password] --store [your-store.myshopify.com] --env [dev or live] --name ['theme name']
```

3. Publish the new theme through Shopify panel: **your-store.myshopify.com/admin/themes**

4. Start developing:
```shell
$ npm run start
$ npm run open:dev # open store url in default browser
```
<!-- getting started (end) -->

<!-- deploying (start) -->
## Deploying

```shell
$ npm run build # bundle js, css and other assets like images/fonts with webpack
$ npm run deploy:live # deploy shopify/ directory
```
<!-- deploying (end) -->

<!-- css preprocessors (start) -->
## CSS preprocessors
> For the most cohesive development experience, it's recommended that you use PostCSS exclusively. [Tailwind CSS Docs](https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus)

By default only PostCSS with PreCSS are installed. [PreCSS](https://github.com/jonathantneal/precss) lets you use sass-like markup in css files. If you want to use a preprocessor it's recommended to use `SASS/SCSS`.

### SASS/SCSS
1. Run the following command:

#### npm

```shell
$ npm install sass sass-loader --save-dev
```

#### yarn
```shell
$ yarn add sass sass-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.scss`

3. Change `import './css/main.css'` to `import './css/main.scss'` in [src/main.js](src/main.js)
<!-- css preprocessors (end) -->

<!-- directories (start) -->
## Directories

| Directory | Description |
| - | - |
| .config | contains multiple configurations and plugins for the development environment |
| .github | contains files related to github and design/image files for READMEs |
| shopify | contains default Shopify theme directory structure wtih `.liquid` files and configs |
| src | contains `main.js` webpack entry point, `tailwind.config.js`, `vue` and `css` files |
<!-- directories (end) -->

<!-- tasks (start) -->
## Tasks

| Task | Description |
| - | - |
| start | run `dev`, `reloadr` and `shopify:watch` tasks simultaneously in parallel |
| dev | bundle and watch for changes in `src/` files with webpack |
| build | create minified production files for Shopify in `shopify/assets/` directory |
| reloadr | run a http server and websocket server for remote auto-reloading |
| lint | lint `.js` and `.vue` files inside the `src/` directory |
| shopify:watch | watch for changes in the `shopify/` directory and upload to the dev store |
| shopify:init | initialize a theme on remote Shopify store and create a Shopify config file for specified environment |
| deploy:dev | upload the `shopify/` directory to the dev store |
| deploy:live | upload the `shopify/` directory to the live store |
| settings:dev | download `settings_data.json` from dev store |
| settings:live | download `settings_data.json` from live store |
| open:dev | open the url of the dev store |
| open:live | open the url of the live store |
<!-- tasks (end) -->

<!-- development environment concepts (start) -->
## Development environment concepts

- By running `shopify:init` and entering credentials, the task initializes a new theme from `shopify/` directory to the provided Shopify store. It also saves a configuration file for the specified environment inside `.config/shopify/` directory. This file will be ignored by git and shouldn't be tracked for security reasons. All tasks regarding Shopify will use the credentials from the saved configuration file.
- By running `yarn start` 3 tasks are executed in parallel: `dev`, `reloadr` and `shopify:watch`.
- Inside the `src/` directory are: a tailwind config, scss files and vue related files.
- All vue related files are auto-loaded by webpack with [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) - vue components, vuex modules, mixins with `global` in their filename and directives with `global` in their filename.
- Vue components can be either used as regular single-file-components or as [renderless components](https://css-tricks.com/building-renderless-vue-components) without `<template></template>` tags.
- The webpack bundle and all other assets are outputted to `shopify/assets/` directory.
- The `shopify/` directory is being watched for changes and all changed files are uploaded to the Shopify remote server. After the upload is finished, a request is sent to a `localhost:port` address and the [reloadr script](.config/reloadr/) reloads the remote store (if it's open in the browser and connected via websockets).
<!-- development environment concepts (end) -->

<!-- limitations (start) -->
## Limitations

- When the development task is running, the browser console throws a `bundle.css` error
- Already running Shopify tasks only upload files which are changed, a simple re-save of a file, without editing it, won't upload the file to the remote store
- Vue components inside `.liquid` files can only be used in a non-self-closing `<kebab-case></kebap-case>` manner
- `<style></style>` and `<script></script>` will be removed on mount inside vue components (basically everything inside `<div id="app"></div>`), use `<component is="style"><componet>` and `<component is="script"></componet>` instead
<!-- limitations (end) -->