const path = require('path');

module.exports = [{
    entry: './src/js/main.js',
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/js/'),
            config: path.resolve(__dirname, 'config/'),
            scss: path.resolve(__dirname, 'src/scss/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-function-bind"
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/i,
                use: ['style-loader','css-loader','sass-loader'],
            },
        ]
    },
    output: {
        path: __dirname + '/public/dist',
        publicPath: '/',
        filename: 'bundle.js'
    }
}]