#!/bin/sh
export PATH=/Users/adrianlunadiaz/.nvm/versions/node/v24.13.1/bin:$PATH
node node_modules/.bin/next build && exec node node_modules/.bin/next start
