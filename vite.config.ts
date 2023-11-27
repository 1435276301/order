//vite.config.ts

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'
import os from 'os'
function getNetworkIp() {
	let needHost = ''
	try {
		const network = os.networkInterfaces()
		for (const dev in network) {
			const iface = network[dev]
			if (iface) {
				// 添加这个条件检查，确保iface有被定义
				for (let i = 0; i < iface.length; i++) {
					const alias = iface[i]
					if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
						needHost = alias.address
					}
				}
			}
		}
	} catch (e) {
		needHost = 'localhost'
	}
	return needHost
}
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: process.env.NODE_ENV === 'development'
	},
	resolve: {
		alias: {
			'@': path.resolve('./src')
		},
		extensions: ['.mjs', '.js', '.jsx', '.json', '.vue']
	},
	plugins: [
		uni(),
		AutoImport({
			// 使用
			imports: ['vue', 'uni-app'],
			dts: 'src/auto-imports.d.ts',
			// 如有用到eslint记得加上写段，没有用到可以忽略
			eslintrc: {
				enabled: true
			},
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/ // .vue
			]
		})
	],
	define: {
		'import.meta.env.BASE_IP': JSON.stringify(
			// eslint-disable-next-line no-undef
			`http://${getNetworkIp()}:3031`
		)
	}
})
