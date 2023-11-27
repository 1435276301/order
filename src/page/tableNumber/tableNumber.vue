<template>
	<view class="tableNumber">
		<!-- 欢迎语 -->
		<view class="title">
			<view>欢迎来到</view>
			<view></view>江南刘哥餐饮店
		</view>
		<!-- 选择就餐人数 -->
		<view class="body">
			<view class="item">
				<view style="font-size: 22px; font-weight: 1000; color: black">您好，请选择就餐人数</view>
				<view>桌号:{{ scene }}</view>
				<scroll-view scroll-x class="scroll">
					<view v-for="(item, index) in 6" :key="item" :class="{ active: index === isActive }" class="people" @tap="numberOfPeople(item, index)"
						>{{ item }}
					</view>
				</scroll-view>
				<view>
					<button style="background: #fcce57" @tap="getUserInfo">开始点餐</button>
				</view>
			</view>
		</view>
	</view>

	<Loading :loading="loading" />
</template>

<script lang="ts" setup>
import { addUserAPI } from '@/api/user'
const count = ref(1)
const numberOfPeople = (item: number, index: number) => {
	count.value = item
	isActive.value = index
}
const loading = ref(false)
const scene = ref()
onLoad((query) => {
	const number = decodeURIComponent(query!.scene)
	scene.value = number
})
const isActive = ref(0)
const getUserInfo = async () => {
	await new Promise((resolve) => {
		uni.getUserProfile({
			desc: '获取用户信息',
			success: (res) => {
				console.log(res)

				uni.login({
					success: (res) => {
						uni
							.request({
								url:
									'https://api.weixin.qq.com/sns/jscode2session?appid=wxc9051b6bfbad3812&secret=931489be1ef8678add17db4f8c5927f3&grant_type=authorization_code&js_code=' +
									res.code
							})
							.then(async (res) => {
								loading.value = true
								console.log((res.data as any).openid)

								resolve(uni.setStorageSync('token', (res.data as any).openid))
								await addUserAPI(uni.getStorageSync('token'))
								loading.value = false
							})
					}
				})
			}
		})
	})

	uni.navigateTo({
		url: `../menu/menu?scene=${scene.value}&count=${count.value}`
	})
}
</script>

<style scoped lang="scss">
.tableNumber {
	width: 100vw;
	height: 100vh;
	background: url(../../assets/1.JPEG);
	background-size: cover;
	opacity: 0.8;
	display: flex;
	flex-direction: column;

	.title {
		flex: 1.5;
		width: 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 30px;
	}

	.body {
		flex: 1.5;

		.item {
			background: #fff;
			margin: 0 auto;
			padding: 10px;
			width: 90%;
			height: 80%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.scroll {
				// 不换行
				white-space: nowrap;

				.people {
					display: inline-block;
					background: #ccc;

					text-align: center;
					margin: 10px;
					width: 20%;
					height: 40px;
					line-height: 40px;
					border-radius: 5px;
				}
			}
		}
	}
}

.active {
	background: #fcce57 !important;
}
</style>
