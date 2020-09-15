<img width="100%" src=".config/.readme/banner.svg" alt="Shopify Starterkit banner">

# Shopify Starterkit

Shopify Starterkit is a development environment for rapid Shopify theme development with Vue and Tailwind CSS 🔥
The kit provides an easy way to build a custom Shopify theme from scratch. It contains a minimal styled boilerplate as a starting point. Everything is pre-configured and should work out of the box.

## Features
- Shopify
- Shopify Theme Kit
- Vue
- Vuex
- SCSS
- Tailwind CSS
- Webpack
- ESLint
- Auto-Reload
- Easily expandable

## System requirements
- Node.js
- npm or yarn

## Getting started
1. Get Shopify api access [Theme Kit Docs](https://shopify.github.io/themekit#get-api-access)
2. Clone or download this repo

3. Install dependencies:
```
$ yarn install
```

4. Initialize theme on Shopify with credentials from first step. Either for **dev** or **live** environment:
```
$ yarn shopify:init --password [your-api-password] --store [your-store.myshopify.com] --env [dev or live] --name [theme name]
```

5. Start developing:
```
$ yarn start
$ yarn open:dev
```

## Deploying
```
$ yarn build
$ yarn deploy:live
```

## Directories
| Directory | Description |
| - | - |
| .config | contains multiple configurations for the development environment |
| shopify | contains Shopify theme templates and config files |
| src | contains `tailwind`, `vue` and `scss` files |

## Tasks
| Task | Description |
| - | - |
| start | run `dev`, `reloadr` and `shopify:watch` tasks in parallel |
| dev | bundle and watch for changes in `src/` files with webpack |
| build | create dist files for Shopify in `shopify/assets/` directory with webpack |
| reloadr | run a http server and websocket server for remote auto reloading |
| lint | lint `js` and `vue` files inside the`src/` directory |
| shopify:watch | watch for changes in the `shopify/` directory and upload to the dev store |
| shopify:init | initializes theme on remote shopware store and creates a shopify config file for specified environment |
| deploy:dev | upload the `shopify/` directory to the dev store |
| deploy:live | upload the `shopify/` directory to the live store |
| settings:dev | download `settings_data.json` from dev store |
| settings:live | download `settings_data.json` from live store |
| open:dev | open the url of the dev store |
| open:live | open the url of the live store |

## Limitations
- Vue components can only be used in `<kebab-case />`
- `<style></style>` will be removed on mount inside vue components (basically everything inside #app), use `<component is="style"><componet>` instead