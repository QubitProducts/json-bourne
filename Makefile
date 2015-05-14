.PHONY: test

BIN = ./node_modules/.bin

test:
	@$(BIN)/standard
	@./node_modules/karma/bin/karma start --single-run=true