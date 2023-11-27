<template>
	<view class="body">
		<scroll-view scroll-y style="max-height: 90%">
			<view class="order" v-for="item in userOrderData" :key="item.id">
				<!-- 店铺信息 -->
				<view class="shop">
					<view>江南刘哥餐饮店</view>
					<view>已完成</view>
				</view>
				<!-- 主体内容 -->
				<view class="content">
					<view class="left">
						<view>桌台名称：{{ item.table }}</view>
						<view>下单时间：{{ item.time }}</view>
					</view>
					<view class="right">￥{{ item.totalPrice }}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
import { getUserOrderAPI } from '@/api/order'
import type { DataList } from '@/types/user'
import dayjs from 'dayjs'
onLoad((options) => {
	nextTick(() => {
		getUserOrder(options!.userId)
	})
})

// 获取用户订单
const userOrderData = ref<DataList>()
const getUserOrder = async (userId: number) => {
	const res = await getUserOrderAPI(userId)

	res.data.forEach((item) => {
		item.time = dayjs.unix(Number(item.orderNumber) / 1000).format('YYYY-MM-DD HH:mm:ss')
	})

	userOrderData.value = res.data
}
</script>

<style scoped lang="scss">
.body {
	background: #f8f8f8;
	height: 100vh;
	width: 100vw;
}
.order {
	width: 90%;
	margin: 10px auto;
	background: #fff;
	border-radius: 5px;
	.shop {
		width: 95%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		height: 40rpx;
		border-bottom: 1px solid #ddd;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;

		.left {
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #555;
		}
		.right {
			font-weight: bold;
			font-size: 18px;
		}
	}
}
</style>
