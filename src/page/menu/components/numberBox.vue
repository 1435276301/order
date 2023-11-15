<script setup lang="ts">
import type { Data } from '@/types/menu'

const prop = defineProps<{
	item?: Data
}>()
const count = ref(1)
watch(
	() => prop.item?.count,
	(newVal) => {
		count.value = newVal as number
	}
)
const emit = defineEmits(['change'])
const onChange = (val: any) => {
	emit('change', val.value)
}
</script>
<template>
	<u-number-box v-model="count" bgColor="#fff" min="0" @change="onChange">
		<template #minus>
			<view class="minus">
				<u-icon name="minus" size="12"></u-icon>
			</view>
		</template>
		<template #plus>
			<view class="plus">
				<u-icon name="plus" color="#000" size="12"></u-icon>
			</view> </template
	></u-number-box>
</template>

<style lang="scss" scoped>
.minus {
	width: 26px;
	height: 26px;
	margin-right: 5px;
	border: 1px solid #f4cd4c;
	border-radius: 50%;
	@include flex;
	justify-content: center;
	align-items: center;
}
.plus {
	border-radius: 50%;
	width: 26px;
	height: 26px;
	background-color: #f0c851;
	margin-left: 5px;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}
</style>
