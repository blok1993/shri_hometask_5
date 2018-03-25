const prod = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './public/stylesheets/style.css',
    output: {
        path: __dirname + "/public/scripts",
        filename: 'main.bundle.js'
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {minimize: prod}
                    }
                ]
            }
        ]
    }
};