import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import * as Pinia from 'pinia'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(uviewPlus)
	return {
		app,
		Pinia,
	}
}
