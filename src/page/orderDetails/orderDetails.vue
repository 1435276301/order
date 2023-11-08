<template>
	<view class="orderDetails">
		<!-- 头部 -->
		<view class="header">
			<view class="success">下单成功，坐等开吃</view>
			<view>菜品已经在制作中</view>
		</view>
		<!-- 餐品详情 -->

		<view class="menuDetail">
			<view class="help">
				<view>第1次下单</view>
				<view>下单成功，坐等开吃</view>
			</view>
			<u-read-more showHeight="300" toggle closeText="展开全部" color="#555" :shadowStyle="{ backgroundImage: 'none' }" textIndent="5">
				<view class="content" v-for="item in 10" :key="item">
					<view class="img">
						<image src="../../assets/logo.png" mode="aspectFit" />
						<view class="title">
							<view class="name">江小白</view>
							<view>1瓶</view>
						</view>
					</view>
					<view class="price">￥36</view>
				</view>
			</u-read-more>
			<view class="count">
				<view>共 5 份 总计</view>
				<view><text>￥101.00</text></view>
			</view>
		</view>

		<!-- 订单详情 -->
		<view class="orderDetail">
			<view>订单编号：111111111111111</view>
			<view>下单时间：2023-11-08 16:02:01</view>
			<view>桌台名称：001</view>
		</view>
		<!-- 订单操作 -->
		<view class="orderOperation">
			<view class="btn"><button>加菜</button></view>
		</view>
	</view>
</template>

<script lang="ts" setup></script>

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
