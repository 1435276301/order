<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" />
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<button @click="onScan">点我打开微信扫一扫功能</button>
		<button @click="getScan">获取小程序接口</button>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('请打开微信扫一扫点餐')
const onScan = () => {
	uni.scanCode({
		success: (success) => {
			console.log(success)
		},
	})
}
const accToken = ref()
const getScan = () => {
	uni
		.request({
			url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc9051b6bfbad3812&secret=931489be1ef8678add17db4f8c5927f3',
			method: 'GET',
		})
		.then((res) => {
			accToken.value = (res.data as { access_token: string }).access_token
			uni.request({
				url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + accToken.value,
				method: 'POST',
				data: {
					page: 'page/tableNumber/tableNumber',
					scene: '1',
					env_version: 'trial',
					width: 280,
					check_path: false,
				},
			})
		})
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
