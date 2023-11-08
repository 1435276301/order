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
				<view>桌号:001</view>
				<scroll-view scroll-x class="scroll">
					<view v-for="(item, index) in 6" :key="item" :class="{ active: index === isActive }" class="people" @tap="isActive = index"
						>{{ item }}
					</view>
				</scroll-view>
				<view>
					<button style="background: #fcce57" @tap="getUserInfo">开始点餐</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
onLoad((query) => {
	const scene = decodeURIComponent(query!.scene)
	console.log(scene)
})
const isActive = ref(0)
const getUserInfo = () => {
	uni.getUserProfile({
		desc: '获取用户信息',
		success: (res) => {
			console.log(1, res)

			uni.login({
				success: (res) => {
					console.log(2, res)
				},
			})
		},
	})
}
</script>

<style scoped lang="scss">
.tableNumber {
	width: 100vw;
	height: 100vh;
	background: url(../../assets/1.JPEG) no-repeat;
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
