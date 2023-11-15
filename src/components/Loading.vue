<script setup lang="ts">
defineProps<{
	loading: boolean
}>()
</script>
<template>
	<template>
		<view>
			<u-loading-page loading-text="加载中" :loading="loading"></u-loading-page>
		</view>
	</template>
</template>

<style lang="scss" scoped></style>
