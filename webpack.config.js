const path = require('path')

module.exports = {
    entry: './src/main.js',
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        environment: {
            arrowFunction: false,
        }
    },
    module: {
        rules : [
            {
                test : /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};