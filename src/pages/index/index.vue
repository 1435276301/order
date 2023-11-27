<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<button @click="onScan" style="background: #00b26a; color: #fff">打开微信扫一扫功能</button>
		<!-- <button @click="getScan">获取小程序接口</button> -->
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('请使用微信扫一扫扫描桌上的二维码')
const onScan = () => {
	uni.scanCode({
		success: (success) => {
			if (success.path.indexOf('?') === 28 && success.path.includes('tableNumber')) {
				success.path = success.path.replace('page', '../../page')
				uni.navigateTo({
					url: success.path
				})
			}
		}
	})
}
// const accToken = ref()
/* const getScan = () => {
	uni
		.request({
			url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc9051b6bfbad3812&secret=931489be1ef8678add17db4f8c5927f3',
			method: 'GET'
		})
		.then((res) => {
			accToken.value = (res.data as { access_token: string }).access_token
			console.log(accToken.value)
			uni.request({
				url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + accToken.value,
				method: 'POST',
				data: {
					page: 'page/tableNumber/tableNumber',
					scene: '1',
					env_version: 'trial',
					width: 280,
					check_path: false
				}
			})
		})
} */
</script>

<style>
.content {
	width: 100vw;
	height: 100vh;
	background: url(../../assets/2.JPEG) no-repeat;
	background-size: cover;
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
