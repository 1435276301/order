import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createUnistorage } from 'pinia-plugin-unistorage'
const pinia = createPinia()
pinia.use(createUnistorage())
import * as Pinia from 'pinia'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	app.use(uviewPlus)
	return {
		app,
		Pinia
	}
}
