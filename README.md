<!-- logo (start) -->
<p align="center">
  <img src="https://raw.githubusercontent.com/uicrooks/shopify-theme-lab/master/.github/img/logo.svg" width="250px">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/uicrooks/shopify-theme-lab/master/.github/img/banner.svg" width="400px">
</p>
<!-- logo (end) -->

<!-- badges (start) -->
<p align="center">
  <img src="https://img.shields.io/github/package-json/v/uicrooks/shopify-theme-lab?color=%236e78ff">
  <img src="https://img.shields.io/github/package-json/dependency-version/uicrooks/shopify-theme-lab/vue?color=%234fc08d">
  <img src="https://img.shields.io/github/package-json/dependency-version/uicrooks/shopify-theme-lab/tailwindcss?color=%2306b6d4">
</p>
<!-- badges (end) -->

<!-- title / description (start) -->
<h2 align="center">Shopify Theme Lab</h2>

Shopify Theme Lab is a customizable modular development environment for blazing-fast Shopify theme creation. It is built on top of the [Shopify CLI](https://shopify.dev/themes/tools/cli). By default, it's bundled with Vue.js and Tailwind CSS, but you can swap them for pretty much anything. Build a custom Shopify theme from scratch with a modern stack!

> If you are looking for the old Theme Lab it's here: [Legacy Version 3 branch](https://github.com/uicrooks/shopify-theme-lab/tree/legacy-v3)
<!-- title / description (end) -->

<!-- ecosystem (start) -->
## Ecosystem
| Project | Status | Description |
| - | - | - |
| [Shopify Theme Lab](https://github.com/uicrooks/shopify-theme-lab) | <img src="https://img.shields.io/github/package-json/v/uicrooks/shopify-theme-lab?color=%236e78ff"> | Modular development environment for blazing-fast Shopify theming |
| [Shopify Theme Lab Plugins](https://github.com/uicrooks/shopify-theme-lab-plugins) | <img src="https://img.shields.io/static/v1?label=version&message=misc&color=%236e78ff"> | Official Shopify Theme Lab plugins |
<!-- ecosystem (end) -->

<!-- features (start) -->
## Features

- Shopify
  - Integrates with the [Shopify CLI](https://shopify.dev/themes/tools/cli)
  - Online Store 2.0 support
- JavaScript
  - [Vue](https://v3.vuejs.org)
  - [Vuex](https://next.vuex.vuejs.org)
  - Swap Vue with any other framework e.g. [Alpine.js](https://alpinejs.dev)
  - Extend with [npm packages](https://www.npmjs.com) 📦
- CSS
  - [Tailwind CSS](https://tailwindcss.com)
  - Swap Tailwind CSS with any other framework e.g. [Bulma](https://bulma.io)
  - [PostCSS](https://postcss.org) with [postcss-preset-env](https://preset-env.cssdb.org/features)
  - Preprocessor support: [SASS / SCSS](https://sass-lang.com), [LESS](http://lesscss.org) and [Stylus](https://stylus-lang.com)
- Workflow
  - [Webpack](https://webpack.js.org)
  - [Babel](https://babeljs.io)
  - [ESLint](https://eslint.org)
  - [stylelint](https://stylelint.io)
  - [Browserslist](https://github.com/browserslist/browserslist)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - Easily adjustable/extendable [configurations](.config/)
<!-- features (end) -->

<!-- system requirements (start) -->
## System requirements

- [Ruby](https://www.ruby-lang.org/en) >= `2.7.0`
- [Shopify CLI](https://shopify.dev/themes/tools/cli/installation) >= `2.0.0`
- [Node.js](https://nodejs.org/en) >= `14.0.0`
<!-- system requirements (end) -->

<!-- getting started (start) -->
## Getting started
1. Install the [Shopify CLI](https://github.com/Shopify/shopify-cli) by following [these steps](https://shopify.dev/themes/tools/cli/installation).

2. Create a [development store](https://shopify.dev/themes/tools/development-stores).

3. Clone this repo or simply run the following `Shopify CLI` command:
```sh
$ shopify theme init -u https://github.com/uicrooks/shopify-theme-lab
```

4. Login into your development store:
```sh
$ shopify login --store <your-store.myshopify.com>
```

5. Install dependencies and run the `start` task:
```sh
$ npm install
$ npm run start
```
<!-- getting started (end) -->

<!-- deploying (start) -->
## Deploying
Create a new theme on the store that you're connected to:
```sh
$ npm run deploy:new
```

Deploy to an existing theme on the store that you're connected to:
```sh
$ npm run deploy
```

> ⚠ The deploy task overrides all files of the remote theme! If any changes were made through the Shopify theme editor you might want to download the theme files before deploying:

1. Make sure you have a clean git history and committed all files.

2. Run the `shopify:pull` command:
```sh
$ npm run shopify:pull
```

3. Revert any files that were pulled and you don't need e.g. Because you already have a newer version.
<!-- deploying (end) -->

<!-- version control (start) -->
## Version control

> ℹ️ Sice Theme Lab uses a custom build workflow it's not out of the box compatible with the [Shopify GitHub integration](https://shopify.dev/themes/tools/github).

One of the simplest ways to achieve version control for a live store is to use 2 separate repos. One for your source code and one for your dist code. That way you can use the Shopify GitHub integration for your dist repo.

```text
shopify-theme-lab/             📁 directory (not connected to any git repos)
├── source-code/               📁 directory for source code (connected to a GitHub repo)
└── dist-code/                 📁 directory for dist code (connected to a GitHub repo)
```

When you are ready to publish the theme to a live store simply run `npm run webpack:build` and move the contents of the `shopify` directory from the `source-code` to the `dist-code` directory.

The [Shopify docs](https://shopify.dev/themes/best-practices/version-control) describe several other ways how to set up version control.
<!-- version control (end) -->

<!-- css preprocessors (start) -->
## CSS preprocessors
> ℹ️ For the most cohesive development experience, it's recommended that you use PostCSS exclusively when working with [Tailwind CSS](https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus).

By default, only PostCSS with `postcss-preset-env` is installed. [postcss-preset-env](https://preset-env.cssdb.org/features) lets you use tomorrow’s CSS today. If you want to use a preprocessor it's recommended to use `SASS/SCSS` since it's the most compatible with a variety of CSS frameworks.

### SASS/SCSS
1. Run the following command:

#### npm
```sh
$ npm install sass sass-loader --save-dev
```

#### yarn
```sh
$ yarn add sass sass-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.scss`

3. Change `import './css/main.css'` to `import './css/main.scss'` in [src/main.js](src/main.js)

### LESS
1. Run the following command:

#### npm
```sh
$ npm install less less-loader --save-dev
```

#### yarn
```sh
$ yarn add less less-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.less`

3. Change `import './css/main.css'` to `import './css/main.less'` in [src/main.js](src/main.js)

### Stylus
1. Run the following command:

#### npm
```sh
$ npm install stylus stylus-loader --save-dev
```

#### yarn
```sh
$ yarn add stylus stylus-loader --dev
```

2. Rename `src/css/main.css` to `src/css/main.styl`

3. Change `import './css/main.css'` to `import './css/main.styl'` in [src/main.js](src/main.js)

<!-- css preprocessors (end) -->

<!-- swapping css framework (start) -->
## Swapping CSS framework

### Removing Tailwind CSS

1. Remove package:

#### npm
```sh
$ npm uninstall tailwindcss
```

#### yarn
```sh
$ yarn remove tailwindcss
```

2. Remove tailwind config:

```sh
$ rm src/tailwind.config.js # or delete manually
```

3. Inside [postcss.config.js](.config/postcss.config.js) remove `require('tailwindcss')(path.resolve(__dirname, '../src/tailwind.config.js'))`.

4. Remove all `@import "tailwindcss/..";` imports from [main.css](src/css/main.css)

### Bulma

1. [Install SASS/SCSS](#sassscss) and update files accordingly

2. Install package:

#### npm
```sh
$ npm install bulma
```

#### yarn
```sh
$ yarn add bulma
```

3. import bulma in `main.scss` with `@import "~bulma/bulma";`
<!-- swapping css framework (end) -->

<!-- swapping javascript framework (start) -->
## Swapping JavaScript framework

### Removing Vue

1. Remove packages:

#### npm
```sh
$ npm uninstall vue vuex vue-loader @vue/compiler-sfc
```

#### yarn
```sh
$ yarn remove vue vuex vue-loader @vue/compiler-sfc
```

2. Remove [vue](src/vue) directory:

```sh
$ rm -r src/vue # or delete manually
```

3. Remove everything from [main.js](src/main.js) except `import './css/main.css'`

4. Inside [.eslintrc.js](.config/.eslintrc.js):
```js
{
  ...
  extends: [
    ...
    'plugin:vue/vue3-recommended' // remove 'plugin:vue/vue3-recommended'
    ...
  ],
  plugins: [
    'vue' // remove 'vue'
  ]
  ...
}
```

5. Inside [webpack.common.js](.config/webpack/webpack.common.js):

```js
...
const webpack = require('webpack') // remove explicit webpack require
const { VueLoaderPlugin } = require('vue-loader') // remove VueLoaderPlugin require
...
```

```js
module: {
  rules: [
    ...
    // remove vue-loader
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
    ...
  ]
}
```

```js
{
  plugins: [
    ...
    // remove VueLoaderPlugin and webpack.DefinePlugin
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    })
    ...
  ]
}
```

### Alpine.js
If you want to use something lighter than Vue, a good alternative is [Alpine.js](https://alpinejs.dev).

1. Install package:

#### npm
```sh
$ npm install alpinejs
```

#### yarn
```sh
$ yarn add alpinejs
```

2. Import `alpinejs` in [main.js](src/main.js):
```js
import 'alpinejs'
```
<!-- swapping javascript framework (end) -->

<!-- project structure (start) -->
## Project structure

```text
shopify-theme-lab/             📁 root of your Shopify Theme Lab project
├── .config/                   📁 development environment files and configs
│   ├── webpack/               📁 webpack configs
│   │   ├── webpack.common.js  📄 webpack shared config used in development and production
│   │   ├── webpack.dev.js     📄 webpack development config
│   │   └── webpack.prod.js    📄 webpack production config
│   ├── .browserslistrc        📄 Browserslist config
│   ├── .eslintrc.js           📄 ESLint config
│   ├── .stylelintrc.js        📄 stylelint config
│   └── postcss.config.js      📄 PostCSS config
├── .github/                   📁 files related to GitHub and images for READMEs
├── shopify/                   📁 default Shopify theme structure
│   ├── assets/                📁 files outputted by webpack will be placed here
│   └── ...
├── src/                       📁 source files processed by webpack
│   ├── css/                   📁 css directory
│   │   └── main.css           📄 main stylesheet
│   ├── vue/                   📁 Vue, Vuex files and directories
│   │   └── ...
│   ├── main.js                📄 webpack's main entry point
│   └── tailwind.config.js     📄 Tailwind CSS config
├── .gitignore                 📄 files and directories ignored by git
├── package.json               📄 dependencies and tasks
└── ...
```
<!-- project structure (end) -->

<!-- tasks (start) -->
## Tasks

| Task | Description |
| - | - |
| start | run `shopify:serve` and `webpack:watch` tasks simultaneously in parallel |
| deploy | upload local files from the `shopify` directory to the store that you're connected to |
| deploy:new | same as `deploy` but creates a new unpublished theme |
| webpack:watch | bundle and watch for changes in `src/` files with webpack |
| webpack:build | create minified production files for Shopify in `shopify/assets/` directory |
| shopify:serve | upload the current theme as a development theme to the store that you're connected to |
| shopify:pull | retrieve theme files from Shopify |
| lint | run all `lint:*` tasks in sequence |
| lint:js | lint JavaScript code inside the `src/` directory |
| lint:css | lint styles inside the `src/` directory |
| lint:shopify | run `shopify theme check` in the `shopify` directory |
| fix | same as `lint` task but also fixes any fixable errors |
| fix:js | same as `lint:js` task but also fixes any fixable errors |
| fix:css | same as `lint:css` task but also fixes any fixable errors |
| fix:shopify | same as `lint:shopify` task but also fixes any fixable errors |
<!-- tasks (end) -->

<!-- webpack (start) -->
## Webpack

- All webpack configs are inside `.config/webpack/` directory
- [main.js](src/main.js) is webpack's main entry point
- All Vue-related files are auto-loaded by webpack with [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) - Vue components, Vuex modules, as well as mixins and directives with `global` in their filename. Everything is defined in `src/main.js`
- The webpack bundle and all other assets are outputted to `shopify/assets/` directory. This directory is cleaned on every build.
<!-- webpack (end) -->

<!-- static files (start) -->
## Static files

Place your static files inside the `shopify/assets/` directory and add the `static` keyword to their filename e.g. `myfile.static.png`. All files inside this directory are ignored by git except for files with `static` in their filename. Since this directory is also shared with files generated by webpack, it's cleaned on every consecutive build except for `static` files.
<!-- static files (end) -->

<!-- local fonts (start) -->
## Local fonts

1. add your fonts to the `shopify/assets/` directory with the `static` keyword e.g.:
```text
shopify-theme-lab/
├── shopify/
│   ├── assets/
│   │   ├── open-sans-regular.static.woff
│   │   └── open-sans-regular.static.woff2
│   └── ...
└── ...
```

2. create a Shopify snippet `shopify/snippets/fonts.liquid` with the following content:
```liquid
{% style %}
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: url('{{ 'open-sans-regular.static.woff2' | asset_url }}') format('woff2'),
         url('{{ 'open-sans-regular.static.woff' | asset_url }}') format('woff');
  }
{% endstyle %}
```

3. render the `fonts` snippet below `bundle.css` inside `shopify/layout/theme.liquid`:
```liquid
...
{{ 'bundle.css' | asset_url | stylesheet_tag }}
{% render 'fonts' %}
...
```

4. Create a css file and import it into `src/css/main.css` with the following content:
```css
body {
  font-family: 'Open Sans', sans-serif;
}
```
<!-- local fonts (end) -->

<!-- common pitfalls (start) -->
## Common pitfalls

- `<style></style>` and `<script></script>` will be removed on mount inside Vue components (basically everything inside `<div id="app">...</div>`), use `<component is="style"><componet>` and `<component is="script"></componet>` instead
- If you want to pass an entire Shopify Drop (Object) as a prop, you have to first convert the Drop to `json` and replace all double quotes with single quotes: `<component :shopify-data="{{ product | json | replace: '"', "'" }}"></component>`. Not all Drops can be converted to `json`, if you get an `{"error":"json not allowed for this object"}` it's a Shopify limitation and you have to pass the values in question individually
<!-- common pitfalls (end) -->

<!-- limitations (start) -->
## Limitations

- When the `start` task is running, the browser console throws a `bundle.css` missing error
- Vue components inside `.liquid` files can only be used in a non-self-closing `<kebab-case></kebap-case>` manner
<!-- limitations (end) -->

<!-- contributing (start) -->
## Contributing

Everyone is welcome to make Shopify theme development better! Please read the [Contributing guide](.github/CONTRIBUTING.md) before creating issues or submitting pull requests.
<!-- contributing (end) -->