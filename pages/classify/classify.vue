<template>
	<custom-nav-bar title="分类"></custom-nav-bar>
	<view class="classLayout pageBg">
		<view class="classify">
			<theme-item></theme-item>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.classify{
	padding: 30rpx;
	display: grid;
	gap: 15rpx;
	grid-template-columns: repeat(3,1fr);
}
</style>
