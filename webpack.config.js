var webpack = require('webpack');

module.exports = {
    plugins: [
		new webpack.DefinePlugin({
			'process.env': {
			'NODE_ENV': JSON.stringify('production')
			}
		})
	],
    entry: {
        app: ["./src/index.js"]
    },
    output: {
            filename: "./dist/app.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        'toastr': "toastr", 
        //'react-redux': "reactRedux",
        //'redux-form': "reduxForm",
        'lodash': "_"
    },
    
    devServer: {
        proxy: { 
            '/**': {  //catch all requests
                target: '/index.html',  //default target
                secure: false,
                bypass: function(req, res, opt){
                    //your custom code to check for any exceptions
                    if(req.path.includes('/dist/') === true){
                        return req.path;
                    }else{
                        return '/';
                    }

                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                }
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};