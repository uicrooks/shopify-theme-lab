/**
 * this is a script to quickly initialize the local development environment and a remote shopify theme
 */
const path = require('path')
const fs = require('fs-extra')
const commandLineArgs = require('command-line-args')
const yaml = require('yaml')
const axios = require('axios')
const chalk = require('chalk')
const themeKit = require('@shopify/themekit') // node wrapper for https://shopify.github.io/themekit

/**
 * get command line arguments
 */
const optionDefinitions = [
  { name: 'env', alias: 'e', type: String, defaultValue: 'dev' },
  { name: 'password', alias: 'p', type: String },
  { name: 'store', alias: 's', type: String },
  { name: 'name', alias: 'n', type: String, defaultValue: 'Shopify Theme Lab' }
]

const options = commandLineArgs(optionDefinitions)

// check the provided options
if (Object.keys(options).length < 4) {
  console.error(chalk.red('not enough arguments provided for initialization'))
  process.exit(1)
}

if (!options.env.match(/^dev$|^live$|^staging$/)) {
  console.error(chalk.red('env should be \'dev\', \'live\' or \'staging\''))
  process.exit(1)
}

/**
 * additional variables
 */
const configPath = path.resolve(__dirname, `../../shopify/shopify.${options.env}.yml`)
let themeId // assigned after remote initialization

/**
 * function initializes local config and remote shopify theme
 */
const initTheme = async () => {
  // initialize empty theme on shopify store
  try {
    const response  = await axios.post(
      `https://${options.store}/admin/api/2020-10/themes.json`,
      { theme: { name: options.name } },
      { headers: { 'X-Shopify-Access-Token': options.password } }
    )

    // assign theme id
    themeId = response.data.theme.id.toString()
  } catch (e) {
    console.error(chalk.red(e))
    process.exit(1)
  }

  // create yaml config
  const yamlConfig = yaml.stringify({
    [options.env]: {
      password: options.password,
      theme_id: themeId,
      store: options.store,
      directory: 'shopify',
      ignores: [
        '.config/shopify/.shopifyignore'
      ]
    }
  })

  // write shopify config file
  try {
    await fs.outputFile(configPath, yamlConfig)
  } catch (e) {
    console.error(chalk.red(e))
    process.exit(1)
  }

  // write settings_data.json to shopify/config
  try {
    const settingsData = {
      current: 'Default',
      presets: {
        Default: {}
      }
    }

    await fs.outputFile(path.resolve(__dirname, '../../../shopify/config/settings_data.json'), JSON.stringify(settingsData))
  } catch (e) {
    console.error(chalk.red(e))
    process.exit(1)
  }

  // upload shopify theme to remote
  try {
    await themeKit.command('deploy', {
      config: configPath,
      env: options.env
    })
  } catch (e) {
    console.error(chalk.red(e))
    process.exit(1)
  }

  console.log(chalk.green('initialized remote theme'))
}

/**
 * inititalise theme
 */
initTheme()