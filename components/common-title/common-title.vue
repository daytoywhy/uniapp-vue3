<template>
	<view class="common-title">
		<view class="name">
			<slot name="name"/>
		</view>
		<view class="custom">
			<slot name="custom"/>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
.common-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	.name{
		font-size: 40rpx;
	}
}
</style>