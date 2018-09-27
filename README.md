# css-loader-relative
css-loader replace url to relative path

[https://github.com/xxxxst/css-loader-relative](https://github.com/xxxxst/css-loader-relative)

```scss
//origin
.home{background: url("/static/image.png");}
//replace
.home{background: url("./static/image.png");}
```

<h2 align="center">Install</h2>

```bash
npm install --save-dev css-loader-relative
```

<h2 align="center">Usage</h2>

add this plugin after css-loader

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
			? [cssLoader, cssLoaderRelative, postcssLoader]
			: [cssLoader, cssLoaderRelative];
		...
	}
}
```

**build/vue-loader.conf.js**
```js
module.exports = {
	...
	options: {
		loaders: {
			scss: 'vue-style-loader!css-loader!css-loader-relative!sass-loader', // <style lang="scss">
			sass: 'vue-style-loader!css-loader!css-loader-relative!sass-loader?indentedSyntax' // <style lang="sass">
		},
	}
}
```

**build/webpack.base.conf.js**
```js
module.exports = {
	...
	module: { 
		rules:[
			...
			{
				test: /\.s[a|c]ss$/,
				loader: 'style!css!css-loader-relative!sass'
			}
		]
	}
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Chen Lin
