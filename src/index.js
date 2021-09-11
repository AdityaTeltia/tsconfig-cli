#!/usr/bin/env node
const inquirer = require("inquirer");
const { writeFileSync } = require('fs');

const reactTsConfig = require('./config/tsconfig.react.json')
const reactNativeTsConfig = require('./config/tsconfig.react-native.json')
const nodeTsConfig = require('./config/tsconfig.node.json')


inquirer
  .prompt([
      {type: 'list' , message: 'Pick the framework you are using', name: 'framework' ,choices:[
          'react',
          'react-native',
          'node'
      ]}
  ])
  .then(({ framework }) => {
    let tsConfigToWrite = '';

    if(framework ===  'react'){
        tsConfigToWrite = JSON.stringify(reactTsConfig);
    }else if(framework === 'react-native'){
        tsConfigToWrite = JSON.stringify(reactNativeTsConfig);
    }else{
        tsConfigToWrite = JSON.stringify(nodeTsConfig);
    }

    // console.log(tsConfigToWrite);

    const cwd = process.cwd();

    writeFileSync(cwd + "/tsconfig.json", tsConfigToWrite , 'utf8')

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
