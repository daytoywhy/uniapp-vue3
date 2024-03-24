<template>
	<view class="classlist">
		<view class="content">
			<navigator url="" class="item">
				<image src="" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.classlist{
	.content{
		padding: 5rpx;
		display: grid;
		gap: 5rpx;
		grid-template-columns: repeat(3,1fr);
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
