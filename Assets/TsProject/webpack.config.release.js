const path = require('path');

/** 忽略编辑的第三方库 */
const externals = {
	csharp: 'commonjs2 csharp',
	puerts: 'commonjs2 puerts',
};

module.exports = {
	entry: path.resolve(__dirname,'./src/GameMain.ts'),
	mode: 'production',
	module: {
		rules: [
		{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		filename: 'bundle.mjs',
		path: path.resolve(__dirname, '../AddressableAssets/Remote/Js')
	},
	externals
};