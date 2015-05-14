module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify', 'expect'],
    files: [
      'test/*.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    preprocessors: {
      'test/**/*.js': ['browserify'],
      '*.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    reporters: ['spec'],
    logLevel: config.LOG_INFO,
    browsers: ['Chrome']
  })
}
