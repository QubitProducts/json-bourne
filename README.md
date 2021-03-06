![json-bourne](https://cloud.githubusercontent.com/assets/823104/6025028/5493ca12-abc7-11e4-9431-43a851bcb08b.jpg)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[ ![Codeship Status for qubitproducts/json-bourne](https://codeship.com/projects/0d7fcc80-dc51-0132-9f1d-025863fcc952/status?branch=master)](https://codeship.com/projects/79926)

Normalizes the JavaScript JSON API against overwritten `Array.prototype.toJSON` and IE8's unstandardized version of `Date.prototype.toJSON`.

Advantages over [JSON 3](https://github.com/bestiejs/json3)
- Much smaller, only a few lines rather than 4KB
- Uses native stringify and parse methods
- Runs much quicker on older browsers

Known issues
- Does not protect against all monkeypatching
- Can be slower at stringifying on newer browsers (see [Benchmarks](#benchmarks))
- Not compatible with IE7 or below

Installation
============
```bash
$ npm install --save json-bourne
```

Motivation
==========
JSON Bourne is intended for use in code that you'll execute on websites you don't control. Such websites can break the native `JSON.stringify` implementation by changing `Array.prototype.toJSON`, specifically if they use prototype.js version 1.6 or under. JSON Bourne also normalizes `Date.prototype.toJSON`, correcting the unstandard implementation for IE8. Any changes to prototypes are restored immediately after stringifying.

Usage
=====

JSON Bourne is a drop in replacement for JSON, replicating the standard `parse` and `stringify` methods exactly.

```javascript
var JSON = require('json-bourne')

console.log(JSON.parse('{"bourne": "legacy"}'))
// Logs { bourne: "legacy" }

console.log(JSON.stringify({"bourne": "ultimatum"}))
// Logs { "bourne": "ultimatum" }
```

Compatibility
=============
Tested on IE8+, Chrome, Firefox, Opera and Safari.

Benchmarks
==========
- [Stringify](http://jsperf.com/json-bourne-stringify)
- [Parse](http://jsperf.com/json-bourne-parse)

Want to work on this for your day job?
======================================

This project was created by the Engineering team at [Qubit](http://www.qubit.com). As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our [Engineering site](https://eng.qubit.com). Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.
