<template>
	<view class="orderDetails">
		<!-- 头部 -->
		<view class="header">
			<view class="success">下单成功，坐等开吃</view>
			<view>菜品已经在制作中</view>
		</view>
		<!-- 餐品详情 -->

		<view class="menuDetail" v-for="item in orderList" :key="item">
			<view class="help">
				<view>第{{ item.count }}次下单</view>
				<view>下单成功，坐等开吃</view>
			</view>
			<u-read-more showHeight="300" toggle closeText="展开全部" color="#555" :shadowStyle="{ backgroundImage: 'none' }" textIndent="5">
				<view class="content" v-for="children in item.children" :key="children">
					<view class="img">
						<image :src="children.image" mode="aspectFit" />
						<view class="title">
							<view class="name">{{ children.name }}</view>
							<view>{{ children.count }}{{ children.unit }}</view>
						</view>
					</view>
					<view class="price">￥{{ children.price }}</view>
				</view>
			</u-read-more>
			<view class="count">
				<view>共 {{ item.children?.length }} 份 总计</view>
				<view
					><text>￥{{ item.price }}</text></view
				>
			</view>
		</view>

		<!-- 订单详情 -->
		<view class="orderDetail">
			<view>订单编号：{{ order?.orderNumber }}</view>
			<view>下单时间：{{ order?.time }}</view>
			<view>桌台名称：{{ order?.table }}</view>
		</view>
		<!-- 订单操作 -->
		<view class="orderOperation">
			<view class="btn"><button @tap="goAddDishes">加菜</button></view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { updateSoldCountAPI } from '@/api/menu'

const order = ref()
const orderList = ref<any>([])
onLoad((options) => {
	order.value = JSON.parse(decodeURIComponent(options!.order))
	orderList.value = JSON.parse(order.value.orderList).reverse()

	orderList.value[0].children.forEach(async (item1: any) => {
		item1.sold = item1.count
		await updateSoldCountAPI(item1.id, item1.sold)
	})
})

const goAddDishes = () => {
	uni.navigateBack()
}
</script>

<style scoped lang="scss">
.orderDetails {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100%;
	background-color: #f7f7f7;

	.header {
		margin: 0;
		padding: 50rpx 0 0 25rpx;
		width: 100%;
		height: 20vh;
		background: #fcd25c;

		.success {
			font-size: 22px;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
	}

	.menuDetail {
		background: #fff;
		height: auto;
		margin: 0 auto;
		margin-bottom: 20px;
		width: 95%;
		transform: translateY(-100rpx);
		border-radius: 10rpx;

		.help {
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			color: #555;
			align-items: center;
			font-size: 18px;
		}

		.content {
			padding: 10px;
			display: flex;
			justify-content: space-between;

			.img {
				display: flex;

				image {
					width: 150rpx;
					height: 150rpx;
				}

				.title {
					margin-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 20px;

					.name {
						font-size: 26px;
						font-weight: bold;
					}
				}
			}

			.price {
				font-size: 20px;
				font-weight: bold;
			}
		}

		.count {
			display: flex;
			justify-content: flex-end;
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			height: 100rpx;
			line-height: 100rpx;
			color: #555;
			border-top: 1px solid #ddd;

			view {
				margin-left: 10px;

				text {
					font-size: 20px;
					color: #000;
					font-weight: bold;
				}
			}
		}
	}

	.orderDetail {
		display: flex;
		flex-direction: column;
		background: #fff;
		justify-content: center;
		height: auto;
		transform: translateY(-100rpx);
		width: 95%;
		margin: 0 auto;
		border-radius: 10px;
		color: #555;

		view {
			margin: 15px;
		}
	}

	.orderOperation {
		height: 150rpx;
		width: 100%;
		background: #fff;
		position: sticky;
		bottom: 0;
		display: flex;
		align-items: center;

		.btn {
			height: 50%;
			width: 100%;
			background: #fff;
			display: flex;
			justify-content: flex-end;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0;
				margin-right: 10px;
				width: 25%;
				background: #facf57;
				border-radius: 20px;
			}
		}
	}
}
</style>
