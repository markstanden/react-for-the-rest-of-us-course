/*
 * Created by following webpack documentation on:
 * https://webpack.js.org/concepts/
 * and following Brad Schiff's excellent Developer
 * Workflow course
 */

/* needed for the output property */
const path = require('path');
const buildOutputDir = 'dist';

/* From Brad Schiff's course */
const currentTask = process.env.npm_lifecycle_event;
const postCSSPlugins = [require('autoprefixer')];
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

/*-------------------------------
  COMMANDS TO RUN AFTER BUILD
--------------------------------- */
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy Images', function () {
      fse.copySync('./app/assets/images', `./${buildOutputDir}/assets/images`);
    });
  }
}

/*--------------------------
  GENERIC CONFIG OPTIONS
---------------------------- */

let cssConfig = {
  /* From webpack docs
  https://webpack.js.org/loaders/sass-loader/

  Chain the sass-loader with the css-loader and
  the style-loader to immediately apply all
  styles to the DOM or the
  mini-css-extract-plugin 
  to extract it into a separate file. */

  test: /\.s[ac]ss$/i,
  use: [
    // Translates CSS into CommonJS
    'css-loader',

    /* object contains the plugins for
    postcss to run, postCSSPlugins contains
    and ordered array */
    {
      loader: 'postcss-loader',
      options: {
        plugins: postCSSPlugins,
      },
    },

    // Compiles Sass to regular CSS
    'sass-loader',
  ],
};

/* returns an array of files from directory
filter the array, returning an array of onlybhtml files
run htmlwebpackplugin on each html file in the array, adding
the hashed js scripts for each*/
let pages = fse
  .readdirSync('./app')
  .filter(function (filename) {
    return filename.endsWith('.html');
  })
  .map(function (page) {
    return new HTMLWebpackPlugin({
      filename: page,
      template: `./app/${page}`,
    });
  });

let config = {
  /*  An entry point indicates which module
  webpack should use to begin building
  out its internal dependency graph. 
  
  Add the following JS to the entry file below
  (change the import path to the 
    scss file containing the @import links):
  
        // From webpack docs
        // https://webpack.js.org/loaders/sass-loader/

        // Path to 'main' stylesheet
        import '../styles/index.scss';

        // for hot swapping in the dev server
        if (module.hot) {
          module.hot.accept();
        }
  */

  entry: './app/assets/scripts/index.js',
  plugins: pages,
  target: 'web',
  module: {
    rules: [
      cssConfig,

      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              /* get babel to transcode jsx for react
              components into compliant code */
              /* '@babel/preset-react', */

              /* get Babel to transcode new JS into more 
            compliant code for older browsers */
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
};

/*-----------------------------------
  DEVELOPMENT ONLY CONFIG OPTIONS
------------------------------------- */

if (currentTask == 'dev') {
  /* add the style loader to the front of the use array,
  the style loader handles the code injection
  this will execute last. */
  cssConfig.use.unshift('style-loader');
  console.log(__dirname);
  config.output = {
    /* Needs to match HTML script tag
    <script src="bundle.js"></script> */
    path: `${__dirname}/app`,
    filename: 'bundle.js',
  };
  config.mode = 'development';
  config.devServer = {
    before: function (app, server) {
      server._watch('./app/**/*.html');
    },
    contentBase: path.join(__dirname, 'app/'),
    compress: true,
    hot: true,
    port: 3000,
    host: '0.0.0.0',
  };

  /* adds meta-data into the browser dev-tools
  to aid debugging */
  config.devtool = 'source-map';
}

/*-------------------------------
  BUILD ONLY CONFIG OPTIONS
--------------------------------*/

if (currentTask == 'build') {
  /* add the css extractor to the start of the cssConfig.use array
  as the use array runs backwards, this will happen last */
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  /* Add the cssnano postcss plugin to the end of the plugin array
  css nano minimises the size of the generated css file */
  postCSSPlugins.push(require('cssnano'));

  config.output = {
    /* Needs to match HTML script tag
    <script src="bundle.js"></script> */

    /* gets webpack to produce uniquely names chunk files,
    which means browser will redownload if changes are made
    as hash will change */
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: `${__dirname}/${buildOutputDir}`,
  };

  /* webpack will use production mode, which
  sets many options to production defaults */
  config.mode = 'production';

  /* From Brad Schiff's course
  wepack removes the dependancies from the js bundle,
  to save redownloading static js modules
  (which presumably won't be updated as frequently as our site js */
  config.optimization = {
    splitChunks: {chunks: 'all'},
  };

  config.plugins.push(
    /* From Brad Schiff's course
    removes previously built files ('cleans')
    before compleing the build task */
    new CleanWebpackPlugin(),

    /* creates a new instance of the mini css plugin,
    and sets the required filename for the output */
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),

    /* function to run after the compile steps.  We'll use
    this to copy over images etc */
    new RunAfterCompile()
  );
}

module.exports = config;
