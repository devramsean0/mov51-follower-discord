#!/bin/bash
echo "checking if latest"
git pull
echo "Installing yarn"
npm install -g yarn
echo "Installing dependencies"
yarn install
echo "Building & running initial scripts"
yarn build
yarn registerCommands
echo "Starting the tools"
yarn start