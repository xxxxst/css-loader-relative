# css-loader-relative
css-loader replace url to relative path

https://github.com/xxxxst/css-loader-relative

```scss
//input
@import "/src/assets/css/style.css"
.home{background: url("/static/image.png");}
//output
@import "assets/css/style.css"
.home{background: url("./static/image.png");}
```

<h2 align="center">Install</h2>

```bash
npm install --save-dev css-loader-relative
```

<h2 align="center">Usage</h2>

keep this plugin before scss-loader

## Vue

**build/utils.js**
```js
exports.cssLoaders = function(options) {
	options = options || {}
	const cssLoader = { ... }

	const cssLoaderRelative = {
		loader: 'css-loader-relative'
	}

	function generateLoaders(loader, loaderOptions) {
		const loaders = options.usePostCSS
			? [cssLoader, postcssLoader]
            : [cssLoader];
        
        if(loader) {
            loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
            });
            // add plugin at here
			loaders.push(cssLoaderRelative);
        }
		...
	}
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, xxxxst
