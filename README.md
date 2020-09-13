<p align="center">
  <img width="250px" src=".config/readme/logo.svg" alt="Shopify Starterkit logo">
</p>

# Shopify Starterkit

Shopify Starterkit is a development environment for rapid Shopify theme development with Vue and Tailwind CSS 🔥

## Features
- Shopify
- Shopify Theme Kit Integration
- Vue
- Vuex
- SCSS
- Tailwind CSS
- Webpack
- Auto-Reload

## System Requirements
- Node.js
- Yarn

## Getting started
1. Follow the steps on [Theme Kit Docs](https://shopify.github.io/themekit)
2. Copy and adjust `.config/sample.shopify.config.yml` with credentials from step 1
3. Run `$ yarn install` in root directory
4. Run `$ yarn start` to start developing
5. Run `$ yarn open:dev` to open the development url

## Deploying
1. Run `$ yarn build` to build `js` and `css` files
2. Run `$ yarn shopify:deploy` to deploy to live store

## Directories
| Directory | Description |
| - | - |
| .config | contains configurations for `shopify`, `webpack`, `postCSS` and `reloadr` |
| shopify | contains Shopify theme templates and config files |
| src | contains `tailwind`, `vue` and `scss` files |

## Tasks
| Task | Description |
| - | - |
| start | run `dev`, `reloadr` and `shopify:watch` tasks in parallel |
| dev | bundle and watch for changes in `src/` files with webpack |
| build | create dist files for Shopify in `shopify/assets/` directory with webpack |
| reloadr | run a http server and websocket server for remote auto reloading |
| shopify:watch | watch for changes in the `shopify/` directory and upload to the dev store |
| shopify:deploy | upload the `shopify/` directory to the live store |
| settings:dev | download `settings_data.json` from dev store |
| settings:live | download `settings_data.json` from live store |
| open:dev | open the url of the dev store |
| open:live | open the url of the live store |