import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
	const token = ref(uni.getStorageSync('token') || '')
	const setToken = (acc_token: string) => {
		uni.setStorageSync('token', acc_token)
	}
	return {
		setToken,
		token
	}
})
