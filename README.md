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
<h2 align="center">Shopify Theme Lab</h2>

Shopify Theme Lab is a modular development environment for blazing-fast Shopify theme creation. By default it's bundled with Vue.js and Tailwind CSS, but you can swap them for pretty much anything. Build a custom Shopify theme from scratch with a modern stack!

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
  - [LESS](#less)
  - [Stylus](#stylus)
- [Swaping CSS framework](swaping-css-framework)
  - [Removing Tailwind CSS](#removing-tailwind-css)
  - [Bulma](#Bulma)
  - [Bootstrap](#Bootstrap)
  - [Materialize CSS](#materialize-css)
- [Swaping JavaScript framework](swaping-javascript-framework)
  - [Removing Vue](#removing-vue)
- [Directories](#directories)
- [Tasks](#tasks)
- [Development environment concepts](#development-environment-concepts)
  - [Configs](#configs)
  - [Shopify & environment initialization](#shopify--environment-initialization)
  - [Shopify + webpack](#shopify--webpack)
  - [Shopify remote auto-reloading](#shopify-remote-auto-reloading)
- [Limitations](#limitations)
<!-- toc (end) -->

<!-- features (start) -->
## Features

- Shopify
  - [Shopify Theme Kit](https://www.npmjs.com/package/@shopify/themekit) npm package
  - Default Shopify theme directory structure with unstyled `.liquid` files
  - Quick shopify theme setup on remote store with `npm run shopify:init`
  - Batch of `npm scripts` to run common tasks
- JavaScript
  - [Vue](https://vuejs.org)
  - [Vuex](https://vuex.vuejs.org)
  - [Axios](https://github.com/axios/axios)
  - Extend with [npm packages](https://www.npmjs.com) 📦
- CSS
  - [Tailwind CSS](https://tailwindcss.com)
  - Swap Tailwind CSS with any other framework like [Bulma](https://bulma.io), [Bootstrap](https://getbootstrap.com) or [Materialize CSS](https://materializecss.com)
  - [PostCSS](https://postcss.org) with [PreCSS](https://github.com/jonathantneal/precss)
  - Preprocessor support: [SASS / SCSS](https://sass-lang.com), [LESS](http://lesscss.org) and [Stylus](https://stylus-lang.com)
- Workflow
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [ESLint](https://eslint.org)
  - [Browserlist](https://github.com/browserslist/browserslist)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [PurgeCSS](https://tailwindcss.com/docs/optimizing-for-production#removing-unused-css) integrated in Tailwind CSS
  - Shopify remote theme auto-reloading with [reloadr](.config/plugins/reloadr) plugin
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

> If you migrated to yarn, replace `npm run` with `yarn` when executing upcoming commands.
<!-- installing (end) -->

<!-- getting started (start) -->
## Getting started

1. Get Shopify api access: [Instructions at Theme Kit Docs](https://shopify.github.io/themekit#get-api-access)

2. Initialize theme on Shopify store with credentials from first step. Either for **dev** or **live** environment:
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
> For the most cohesive development experience, it's recommended that you use PostCSS exclusively when working with [Tailwind CSS](https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus).

By default only PostCSS with PreCSS are installed. [PreCSS](https://github.com/jonathantneal/precss) lets you use sass-like markup in `.css` files. If you want to use a preprocessor it's recommended to use `SASS/SCSS` since it's the most compatible with a variety of CSS frameworks.

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

### LESS
1. Run the following command:

#### npm
```shell
$ npm install less less-loader --save-dev
```

#### yarn
```shell
$ yarn add less less-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.less`

3. Change `import './css/main.css'` to `import './css/main.less'` in [src/main.js](src/main.js)

### Stylus
1. Run the following command:

#### npm
```shell
$ npm install stylus stylus-loader --save-dev
```

#### yarn
```shell
$ yarn add stylus stylus-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.styl`

3. Change `import './css/main.css'` to `import './css/main.styl'` in [src/main.js](src/main.js)

<!-- css preprocessors (end) -->

<!-- swapimg css framework (start) -->
## Swaping CSS framework

### Removing Tailwind CSS

1. Remove package:

#### npm
```shell
$ npm uninstall tailwindcss
```

#### yarn
```shell
$ yarn remove tailwindcss
```

2. Remove tailwind config:

```shell
$ rm src/tailwind.config.js # or delete manually
```

3. Inside [postcss.config.js](.config/postcss.config.js) remove `require('tailwindcss')(path.resolve(__dirname, '../src/tailwind.config.js'))`.

4. Remove `@tailwind` imports from [main.css](src/css/main.css)

### Bulma

1. [Install SASS/SCSS](#sassscss) and update files accordingly

2. Install package:

#### npm
```shell
$ npm install bulma
```

#### yarn
```shell
$ yarn add bulma
```

3. import bulma in `main.scss` with `@import "~bulma/bulma";`

### Bootstrap

1. [Install SASS/SCSS](#sassscss) and update files accordingly

2. Install package:

#### npm
```shell
$ npm install bootstrap
```

#### yarn
```shell
$ yarn add bootstrap
```

3. import bootstrap in `main.scss` with `@import "~bootstrap/scss/bootstrap";`

### Materialize CSS

1. [Install SASS/SCSS](#sassscss) and update files accordingly

2. Install package:

#### npm
```shell
$ npm install materialize-css@next
```

#### yarn
```shell
$ yarn add materialize-css@next
```

3. import  materialize-css in `main.scss` with `@import "~materialize-css/sass/materialize";`
<!-- swaping css framework (end) -->

<!-- swapimg javascript framework (start) -->
## Swaping JavaScript framework

### Removing Vue

1. Remove packages:

#### npm
```shell
$ npm uninstall vue vuex vue-loader vue-template-compiler
```

#### yarn
```shell
$ yarn remove vue vuex vue-loader vue-template-compiler
```

2. Remove [vue](src/vue) directory:

```shell
$ rm -r src/vue # or delete manually
```

3. Remove everything from [main.js](src/main.js) except `import './css/main.css'`

4. Inside [.eslintrc.js](.config/.eslintrc.js) remove `'plugin:vue/recommended'` and `'vue'`.

5. Inside [webpack.common.js](.config/webpack/webpack.common.js) remove:

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
```

```js
'vue$': 'vue/dist/vue.esm.js'
```

```js
{
  test: /\.vue$/,
  loader: 'vue-loader'
}
```

```js
new VueLoaderPlugin()
```
<!-- swapimg javascript framework (end) -->

<!-- directories (start) -->
## Directories

| Directory | Description |
| - | - |
| .config | contains multiple configurations and plugins for the development environment |
| .github | contains files related to github and design/image files for READMEs |
| shopify | contains default Shopify theme directory structure wtih `.liquid` files and configs |
| src | contains `main.js` webpack entry point, `tailwind.config.js`, `js`, `vue` and `css` files |
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

### Configs
Inside `.configs/` are multiple pre-configured configs and plugins. You should be able to go from start to finish, whithout ever going in this directory. But if you feel the need to adjust some configs to your liking, go for it!

### Shopify & environment initialization
By running `shopify:init` and entering credentials, the task initializes a new theme from `shopify/` directory to the provided Shopify store. It also saves a configuration file for the specified environment inside `.config/shopify/` directory. This file will be ignored by git and shouldn't be tracked for security reasons. All tasks regarding Shopify will use the credentials from the saved configuration file.

### Shopify + webpack
- You will spend most of your time in `shopify/` and `src/` directories.
- By running `yarn start` 3 tasks are executed in parallel: `dev`, `reloadr` and `shopify:watch`.
- All vue related files are auto-loaded by webpack with [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) - vue components, vuex modules, as well as mixins, directives and filters with `global` in their filename. Everything is defined in `src/main.js`.
- Vue components can be either used as regular single-file-components or as [renderless components](https://css-tricks.com/building-renderless-vue-components) without `<template></template>` tags (You can use Liquid templating while hooking in vue functionality).
- The webpack bundle and all other assets are outputted to `shopify/assets/` directory. This directory is cleaned on every build. If you want to keep certain files like favicons add `static` to their filenames: `myfile.static.png`.

### Shopify remote auto-reloading
While `npm run start` task is running: The `shopify/` directory is being watched for changes and all changed files are uploaded to the Shopify remote server. After the upload is finished, a request is sent to a `localhost:port` address (specified in `package.json`) and the [reloadr](.config/plugins/reloadr/) plugin reloads all connected Shopify store sites. *Open the web console to check if a site is connected.*
<!-- development environment concepts (end) -->

<!-- limitations (start) -->
## Limitations

- When the development task is running, the browser console throws a `bundle.css` missing error
- Already running Shopify tasks only upload files which are changed, a simple re-save of a file, without editing it, won't upload the file to the remote store
- Vue components inside `.liquid` files can only be used in a non-self-closing `<kebab-case></kebap-case>` manner
- `<style></style>` and `<script></script>` will be removed on mount inside vue components (basically everything inside `<div id="app"></div>`), use `<component is="style"><componet>` and `<component is="script"></componet>` instead
<!-- limitations (end) -->