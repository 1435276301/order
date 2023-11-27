<template>
	<div class="menu">
		<!-- 头部信息 -->
		<view class="header">
			<view class="count">{{ people }}人就餐</view>
			<view class="ava">
				<u-icon name="share" size="30" color="#000"></u-icon>
				<u-icon name="account" size="30" color="#000" @tap="user"></u-icon>
			</view>
		</view>
		<!-- 主体 -->
		<view class="content">
			<!-- 左边导航栏 -->
			<scroll-view scroll-y class="scroll-left" :scroll-into-view="rightScrollinto" style="padding-top: 10px">
				<view
					v-for="(item, index) in categoryList"
					:key="item.id"
					class="category"
					:class="{ active: index === isActive }"
					@tap="click(index)"
					:id="'tab' + index"
					><text>{{ item.categoryName }}</text>
					<view class="box"><up-badge type="error" max="99" :value="item.count"></up-badge></view>
				</view>
			</scroll-view>
			<!-- 右边主体内容 -->
			<scroll-view scroll-y class="scroll-right" ref="cateRef" :scroll-into-view="leftScrollinto" @scroll="rightscroll">
				<view v-for="(cate, index) in categoryList" :key="cate.categoryName" class="cateRef">
					<view class="dishes" :id="'left' + index">{{ cate.categoryName }}</view>
					<view v-for="item in dishList" :key="item.id">
						<view v-if="cate.id === item.cgId" class="item">
							<!-- 商品图片 -->
							<view class="img">
								<image :src="item.image" mode="aspectFill" width="150px" />
							</view>
							<!-- 商品描述 -->
							<view class="describe">
								<view class="title">{{ item.name }}</view>
								<view class="count">已售 {{ item.sold }}</view>
								<view class="price"
									><text>￥{{ item.price }}</text
									>/份</view
								>
							</view>
							<!-- 商品操作 -->
							<view class="operation">
								<button v-if="item.sku.length >= 1" @tap="onSku(item)">选规格</button>
								<u-icon
									name="plus-circle-fill"
									size="30"
									color="#f1c956"
									labelColor="#000"
									v-if="item.sku.length === 0 && item.count === 0"
									@click="addCart(1, item)"
								></u-icon>
								<numberBox
									v-if="item.count! >= 1 && item.sku.length === 0"
									:item="item"
									@change="
										(val) => {
											addCart(val, item)
										}
									"
								/>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部按钮和购物车 -->
		<view class="bottom">
			<view class="img" @click="addShow = true">
				<image src="../../assets/cart.png" mode="aspectFit" />
				<view class="box"><up-badge type="error" max="99" :value="cartCount" class="item"></up-badge></view>
			</view>
			<view style="margin-right: 170rpx; color: #999" @click="addShow = true" v-if="cartCount > 0">已点{{ cartCount }}份菜品</view>
			<view class="btn">
				<button style="background: #fbd877" @tap="chooseWell">选好了</button>
			</view>
		</view>
	</div>
	<!-- 弹出层 -->
	<view class="show" style="z-index: 999999">
		<u-popup :show="show" mode="center" :round="15" :customStyle="{ width: '90vw' }" :safeAreaInsetBottom="false" z-index="999999999">
			<!-- 标题 -->
			<view class="title">
				<text>{{ skuList?.name }}</text>
			</view>
			<!-- 规格 -->
			<scroll-view scroll-y style="max-height: 500rpx">
				<view class="sku" v-for="item in skuList?.sku as any" :key="JSON.stringify(item.sku)">
					<!-- 规格名 -->
					<view class="skuName">{{ item.name }}</view>
					<!-- 规格值 -->
					<view class="skuKey">
						<view
							class="skuItem"
							v-for="(children, index) in item.children"
							:key="children"
							:class="{ skuActive: skuArr.includes(children) }"
							@click="clickSku(children, index, item)"
							>{{ children }}</view
						>
					</view>
				</view>
			</scroll-view>
			<!-- 提示已选规格 -->
			<view class="selectSku">
				<text class="text">已选规格：<text class="item">15个</text></text>
			</view>
			<!-- 底部价格与加入购物车按钮 -->
			<view class="bottom">
				<!-- 价格 -->
				<view class="price">
					<view>总计</view>
					<view class="price">￥{{ skuList?.price }}</view>
				</view>
				<!-- 加入购物车 -->
				<view class="cart">
					<up-button icon="plus" class="btn" iconColor="#000" color="#ffcf34" @click="addCart(1, skuList)"><text>加入购物车</text> </up-button>
				</view>
			</view>
			<!-- 关闭按钮 -->
			<view class="close">
				<u-icon name="close-circle-fill" color="#ccc" size="40" @tap="closeShow"></u-icon>
			</view>
		</u-popup>
	</view>

	<!-- 购物车弹出层 -->
	<view class="carts">
		<u-popup :show="addShow" :round="15" @close="cartClose">
			<!-- 头部清空全部 -->
			<view class="clear">
				<u-icon name="trash"></u-icon>
				<text @click="empty">清空已点</text>
			</view>
			<!-- 主体内容 -->
			<scroll-view scroll-y style="max-height: 800rpx; padding-bottom: 10vh">
				<view class="body" v-for="item in cartData" :key="JSON.stringify(item.sku)">
					<view class="item">
						<!-- 图片 -->
						<image :src="item.image" mode="scaleToFill" />
						<view class="price">
							<view>{{ item.name }}</view>
							<view>￥{{ item.price }}</view>
						</view>
					</view>
					<!-- 步进器 -->
					<view>
						<numberBox
							:item="item"
							@change="
								(val, prop) => {
									addCart(val, item)
								}
							"
						/>
					</view>
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script lang="ts" setup>
import { getDishList, getDishCategoryAPI } from '@/api/menu'
import type { DataList, Data } from '@/types/menu'
import numberBox from './components/numberBox.vue'
import dayjs from 'dayjs'
import { createOrderAPI } from '@/api/order'
import { getUserAPI } from '@/api/user'
const isActive = ref(0)

// 计算总价
const totalPrice = computed(() => {
	return cartData.value.reduce((sum, item) => {
		return sum + item.price * item.count!
	}, 0)
})

const order = ref({
	time: '',
	orderList: '',
	table: 0,
	people: 0,
	orderNumber: 0,
	userId: 0,
	totalPrice: 0
})

const orderDetail = reactive<{
	count: number
	children: DataList
	price: number
}>({
	count: 1,
	children: [],
	price: 0
})
const orderList = ref<any>([])
const chooseWell = async () => {
	if (cartData.value.length > 0) {
		orderDetail.children = cartData.value
		orderDetail.price = totalPrice.value

		if (uni.getStorageSync('orderNumber')) {
			orderDetail.count = JSON.parse(JSON.stringify(orderDetail.count)) + 1
		} else {
			await new Promise((resolve) => {
				uni.requestSubscribeMessage({
					tmplIds: ['TdiXKfirQA61Pp3BnRuE2d0hDut8jTMIC81L4Njc8cA'],
					success: async (success: any) => {
						if (success.TdiXKfirQA61Pp3BnRuE2d0hDut8jTMIC81L4Njc8cA === 'accept') {
							// 获取当前时间戳
							order.value.orderNumber = new Date().getTime()

							uni.setStorageSync('orderNumber', order.value.orderNumber)
							order.value.time = dayjs(order.value.orderNumber).format('YYYY-MM-DD HH:mm:ss')
							order.value.table = table.value
							order.value.people = people.value
							return resolve(success.errMsg)
						}
					}
				})
			})
		}
		order.value.userId = userId.value

		orderList.value.push(JSON.parse(JSON.stringify(orderDetail)))

		order.value.totalPrice = orderList.value.reduce((sum: number, item: any) => {
			return (sum += item.price)
		}, 0)
		order.value.orderList = JSON.stringify(orderList.value)

		uni.navigateTo({
			url: '../orderDetails/orderDetails?order=' + encodeURIComponent(JSON.stringify(order.value))
		})

		await createOrderAPI(order.value)

		cartData.value = []
	} else {
		uni.showToast({
			title: '请先选择菜品',
			icon: 'none'
		})
	}
}
onLoad(() => {
	uni.setStorageSync('orderNumber', '')
})

// 个人中心按钮回调
const user = () => {
	uni.navigateTo({
		url: '../myOrder/myOrder?userId=' + userId.value
	})
}
// 菜品列表
const dishList = ref<DataList>([])
// 获取菜品列表
const getDishData = async () => {
	const res = await getDishList()
	res.data = res.data.filter((item) => item.listing === 1)
	res.data.forEach((item: any) => (item.sku = JSON.parse(item.sku)))
	dishList.value = res.data
}
const categoryList = ref()
// 获取菜品分类

const getDishCategory = async () => {
	const res = await getDishCategoryAPI()
	categoryList.value = res.data.map((item: any) => {
		return {
			...item,
			count: 0
		}
	})
}
// 用餐人数
const people = ref(1)
// 桌号
const table = ref(1)
onLoad((options) => {
	getDishData()
	getDishCategory()
	getUserId()
	nextTick(() => {
		people.value = options!.count
		table.value = options!.scene
	})
})
// 通过token查询用户id
const userId = ref(0)
const getUserId = async () => {
	const res = await getUserAPI(uni.getStorageSync('token'))
	userId.value = res.data[0].id
}
const skuList = ref<Data>()
const show = ref(false)
// 选择规格回调
const onSku = (item: any) => {
	skuArr.value = []
	item.sku.forEach((item: any) => {
		if (item.children) {
			skuArr.value.push(item.children[0])
		}
	})
	skuList.value = item
	show.value = true
}

// 关闭弹窗
const closeShow = () => {
	show.value = false
}

const rightScrollinto = ref()
const leftScrollinto = ref()

// 点击右侧导航栏回调
const click = (index: number) => {
	rightScrollinto.value = 'tab' + index
	leftScrollinto.value = 'left' + index
	isActive.value = index
}
const query = uni.createSelectorQuery().in(getCurrentInstance())
const topList = ref<number[]>([])

// 滚动事件
const rightscroll = (eve: any) => {
	query
		.selectAll('.cateRef')
		.boundingClientRect((data: any) => {
			if (data) {
				data.map((item: any, index: number) => {
					let top = index > 0 ? topList.value[index - 1] : 0
					top += item.height
					topList.value.push(top)
				})
			}
		})
		.exec()

	let scrollTop = eve.target.scrollTop
	let result = topList.value.findIndex((item) => {
		return scrollTop <= item
	})
	isActive.value = result
}
// 加入购物车
const addCart = (val: number, item: any) => {
	// 判断当前元素是否有规格
	if (item.sku.length > 0) {
		const arr = JSON.parse(JSON.stringify(item))
		arr.sku.forEach((item1: any) => {
			item1.children.forEach((item2: any) => {
				if (skuArr.value.includes(item2)) {
					item1.children = []
					item1.children.push(item2)
				}
			})
		})
		item = arr
	}
	item.count = val

	// 查找是否已有当前菜品
	const isTrue = cartData.value.find((some) => {
		if (some.id === item.id) {
			if (some.sku.length > 0) {
				return JSON.stringify(some.sku) === JSON.stringify(item.sku)
			}
			return some
		} else {
			return false
		}
	})

	cartData.value.forEach((item1: any) => {
		if (item1.id === item.id && JSON.stringify(item1.sku) === JSON.stringify(item.sku)) {
			item1.count = item.count
			// 筛选出数量不为0的元素
			cartData.value = cartData.value.filter((item) => item.count !== 0)
		}
	})

	if (isTrue) {
		isTrue.count! + 1
	} else {
		cartData.value.push(item)
	}
	categoryList.value.forEach((item1: any) => {
		if (val === 0) item1.count = 0
		const sum = cartData.value.filter((item2: any) => item1.id === item2.cgId)
		if (sum.length > 0)
			item1.count = sum.reduce((sum: number, item3: any) => {
				return (sum += item3.count)
			}, 0)
	})

	// 总数量
	cartCount.value = cartData.value.reduce((sum: number, item1: any) => (sum += item1.count), 0)
}

const addShow = ref(false)
const cartClose = () => {
	addShow.value = false
}

const cartData = ref<DataList>([])

const cartCount = ref(0)

const empty = () => {
	categoryList.value.forEach((item: any) => (item.count = 0))
	dishList.value.forEach((item: any) => {
		item.count = 0
	})
	cartData.value.forEach((item: any) => (item.count = 0))
	cartCount.value = 0
	cartData.value = []
}
watch(
	() => cartData.value,
	() => {
		if (cartData.value.length === 0) {
			empty()
		}
	}
)
const skuArr = ref<any>([])
const clickSku = (children: any, index: number, item: any) => {
	item.children.forEach((item1: any) => {
		skuArr.value = skuArr.value.filter((item2: any) => item2 !== item1)
	})
	skuArr.value.push(children)
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
		padding: 0 10px 10px 0;
		display: flex;
		height: 80%;

		.scroll-left {
			background: #eee;
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
					width: 18px;
					height: 18px;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.scroll-right {
			width: 100%;
			.dishes {
				font-size: 24px;
				margin: 10px;
			}
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
					margin-left: 10px;
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
						width: 120rpx;
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
		background: #fff;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		position: sticky;
		bottom: 0;
		z-index: 12000;
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
				display: flex;
				justify-content: center;
				align-items: center;
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

.show {
	position: relative;
	.title {
		font-size: 18px;
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 10px;
	}
	.sku {
		margin: 10px 10px;
		.skuName {
			font-size: 16px;
			margin: 10px 0;
		}
		.skuKey {
			width: 100%;

			.skuItem {
				display: inline-block;
				width: auto;
				height: auto;
				padding: 5px 12px;
				margin: 10px;
				border: 1px solid #ccc;
				border-radius: 7px;
			}
		}
	}

	.selectSku {
		display: flex;
		align-items: center;
		width: 100%;
		background: #fafafa;
		height: 80rpx;
		.text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 10px;
			font-size: 14px;
			color: #656565;
			.item {
				color: #000;
			}
		}
	}

	.bottom {
		height: 150rpx;
		margin: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.price {
			display: flex;
			align-items: center;
			.price {
				margin-left: 5px;
				font-size: 22px;
				color: red;
			}
		}

		.cart {
			.btn {
				height: 50px;
			}
			text {
				color: #000;
			}
		}
	}

	.close {
		display: flex;
		justify-content: center;
		width: 100%;
		background: transparent none;
		position: absolute;
		bottom: -140rpx;
		margin: 10px 0;
	}
}

.carts {
	.clear {
		margin: 10px;
		display: flex;
		justify-content: flex-end;
		color: #ccc;
	}
	.body {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 10px;
		.item {
			display: flex;

			image {
				width: 150rpx;
				height: 150rpx;
			}
			.price {
				margin-left: 5px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
}

.skuActive {
	background: #faf3df;
	border: #e1ab24 1px solid !important;
	color: #ef8329;
}
</style>
