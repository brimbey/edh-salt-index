require('@babel/register')({
	extends: './.babelrc',
	ignore: [/node_modules/],
	extensions: ['.js', '.jsx', 'ts', '.tsx'],
});

// require('core-js/es5');
// require('core-js/es6');
// require('@core-js/library');
// require('core-js/stage/0');
// require('regenerator-runtime/runtime');

module.exports = function config(api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '70',
                    firefox: '61',
                    edge: '16',
                    ie: '11',
                },
                useBuiltIns: 'usage',
                corejs: 2,
                modules: false,
            },
        ],
        '@babel/preset-react',
    ];

    const plugins = [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-dynamic-import',
        [
            'dynamic-import-override',
            {
                errorHandler: (msg) => { console.log(`[ERROR][BABEL] ${msg}`)},
            },
        ],
    ];

    const env = {
        test: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'dynamic-import-node',
                '@babel/plugin-proposal-class-properties',
                [
                    'babel-plugin-inline-import',
                    {
                        extensions: ['.md'],
                    },
                ],
            ],
        },
        development: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            chrome: '70',
                        },
                        useBuiltIns: 'usage',
                        modules: false,
                    },
                ],
                '@babel/preset-react',
            ],
        },
    };

    return {
        presets,
        plugins,
        env,
    };
};