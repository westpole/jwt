/* eslint-disable */
module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai', 'sinon'],
        reporters: ['spec', 'coverage'],
        browsers: ['PhantomJS'],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/babel-polyfill/dist/polyfill.js',
            'client/index.js',
            'test.webpack.js'
        ],

        preprocessors: {
            'client/index.js': ['webpack'],
            'test.webpack.js': ['webpack', 'sourcemap']
        },

        webpack: {
            cache: true,
            devtool: 'inline-source-map',

            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|dist)/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.css$/,
                        loaders: ['style', 'css']
                    }
                ],
                preLoaders: [
                    {
                        test: /\.spec\.js$/,
                        include: /specs/,
                        exclude: /(node_modules|dist)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.js?$/,
                        include: /client/,
                        exclude: /(node_modules|tests|dist)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true,
                version: true,
                timings: true,
                assets: false,
                chunks: false,
                chunkModules: false,
                modules: false
            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher'),
            require('karma-spec-reporter'),
            require('karma-coverage'),
            require('karma-babel-preprocessor'),
            require('karma-sourcemap-loader'),
            require('karma-chai'),
            require('karma-sinon-chai'),
            require('karma-sinon'),
        ],

        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {
                    type: 'html',
                    subdir: 'html'
                }
            ]
        }
    });
};