.PHONY: test

BIN = ./node_modules/.bin

test:
  @$(BIN)/jscs json.js test/test-json.js
  @$(BIN)/jshint json.js test/test-json.js
  @./node_modules/karma/bin/karma start --single-run=true