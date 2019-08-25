'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

const child_process = require('child_process');    
//****ghm add 2019-08-25 */   
if (fs.existsSync(config.build.assetsRoot+'/widget')) child_process.execSync("rm -rf " + config.build.assetsRoot+'/widget');

//****ghm add 2019-04-26 */

var sh = "cp -r widget "+config.build.assetsRoot;
child_process.execSync(sh);
console.log(JSON.stringify(config.build));


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

      //****ghm add 2019-04-26 */   
    var sh = "cd "+config.build.assetsRoot+";cd ..;zip -r -q widget.zip widget";
    child_process.execSync(sh);
  })
})
