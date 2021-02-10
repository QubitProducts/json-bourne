module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'webpack', 'expect', 'sinon'],
    files: [
      { pattern: 'test/**/*.js', watched: false }
    ],
    exclude: [
      'karma.conf.js'
    ],
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-expect',
      'karma-sinon',
      'karma-spec-reporter',
      'karma-chrome-launcher'
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      '*.js': ['webpack']
    },
    reporters: ['spec'],
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    webpack: {}
  })
}
