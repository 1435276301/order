//vite.config.ts

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: process.env.NODE_ENV === 'development',
	},
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}/`,
		},
		extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
	},
	plugins: [
		uni(),
		AutoImport({
			// 使用
			imports: ['vue', 'uni-app'],
			dts: 'src/auto-imports.d.ts',
			// 如有用到eslint记得加上写段，没有用到可以忽略
			eslintrc: {
				enabled: true,
			},
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
			],
		}),
	],
})
