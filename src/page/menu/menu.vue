<template>
	<div class="menu">
		<!-- 头部信息 -->
		<view class="header">
			<view class="count">2人就餐</view>
			<view class="ava">
				<u-icon name="share" size="30" color="#000"></u-icon>
				<u-icon name="account" size="30" color="#000"></u-icon>
			</view>
		</view>
		<!-- 主体 -->
		<view class="content">
			<!-- 左边导航栏 -->
			<scroll-view scroll-y class="scroll-left">
				<view v-for="(item, index) in 6" :key="item" class="category" :class="{ active: index === isActive }" @tap="isActive = index"
					><text>素菜类</text>
					<view class="box"><up-badge type="error" max="99" value="1"></up-badge></view>
				</view>
			</scroll-view>
			<!-- 右边主体内容 -->
			<scroll-view scroll-y class="scroll-right">
				<view>素菜类</view>
				<view v-for="item in 20" :key="item" class="item">
					<!-- 商品图片 -->
					<view class="img">
						<image src="../../assets/logo.png" mode="aspectFit" width="150px" />
					</view>
					<!-- 商品描述 -->
					<view class="describe">
						<view class="title">土豆丝</view>
						<view class="count">已售 17</view>
						<view class="price"><text>￥2</text>/份</view>
					</view>
					<!-- 商品操作 -->
					<view class="operation">
						<!-- <u-icon name="plus-circle-fill" size="30" color="#f1c956" labelColor="#000"></u-icon> -->
						<button>选规格</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部按钮和购物车 -->
		<view class="bottom">
			<view class="img">
				<image src="../../assets/cart.png" mode="aspectFit" />
				<view class="box"><up-badge type="error" max="99" value="1" class="item"></up-badge></view>
			</view>
			<view class="btn">
				<button style="background: #fbd877" @tap="chooseWell">选好了</button>
			</view>
		</view>
	</div>
</template>

<script lang="ts" setup>
const isActive = ref(0)
const chooseWell = () => {
	uni.requestSubscribeMessage({
		tmplIds: ['TdiXKfirQA61Pp3BnRuE2d0hDut8jTMIC81L4Njc8cA'],
		success: (success) => {
			console.log(2, success)
		},
	})
}
</script>

<style scoped lang="scss">
.menu {
	width: 100vw;
	height: 100vh;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		height: 7%;
		background: #fcd25e;

		.count {
			margin-left: 10px;
		}

		.ava {
			width: 20%;
			display: flex;
			justify-content: space-around;
		}
	}

	.content {
		padding: 10px;
		display: flex;
		height: 80%;

		.scroll-left {
			width: 25%;
			display: flex;

			.category {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 100%;
				margin: 20px auto;
				color: #555;

				.box {
					width: 15px;
					height: 15px;
					border-radius: 15px;
				}
			}
		}

		.scroll-right {
			width: 75%;

			.item {
				display: flex;
				margin: 10px auto;

				.img {
					display: flex;
					width: 85px;
					height: 85px;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.describe {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						font-size: 22px;
						font-weight: bold;
					}

					.count {
						font-size: 14px;
						color: #555;
					}

					.price {
						display: flex;
						align-items: flex-end;
						flex: 1;

						text {
							font-size: 20px;
							font-weight: bold;
						}
					}
				}

				.operation {
					flex: 3;
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;

					button {
						font-size: 16px;
						margin: 0;
						padding: 0;
						background: #f1c956;
						height: 35%;
						line-height: 32px;
						width: 40%;
						vertical-align: middle;
						text-align: center;
						border-radius: 15px;
					}
				}
			}
		}
	}

	.bottom {
		height: calc(13% - 3%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;

		.img {
			width: 70px;
			height: 40px;
			display: flex;
			justify-content: center;

			image {
				width: 100%;
				height: 100%;
			}

			.box {
				text-align: center;
				width: 30px;
				height: 20px;
				line-height: 20px;
			}
		}

		.btn {
			width: 100px;
			height: 35px;

			button {
				border-radius: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
		}
	}
}

.active {
	color: #000 !important;
}
</style>
