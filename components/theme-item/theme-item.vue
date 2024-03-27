<template>
	<view class="theme-item">
		<navigator :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="tab" v-if="compareTimestamp(item.updateTime)">
				{{ compareTimestamp(item.updateTime) }}
			</view>
			<view class="mask">
				{{ item.name }}
			</view>
		</navigator>
		
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<text class="text">更多</text>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import { compareTimestamp } from '@/utils/common.js'
defineProps({
	isMore:{
		type:Boolean,
		default:false
	},
	item:{
		type:Object,
		default:()=>{
			return{
				name:'默认名称',
				picurl: '../../common/images/classify1.jpg',
				updateTime:Date.now() - 1000*60*60*5
			}
		}
	}
})
</script>

<style scoped lang="scss">
.theme-item{
	.box{
				height: 340rpx;
				border-radius: 10rpx;
				overflow:hidden;
				position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.2);
			backdrop-filter: blur(20rpx);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			height: 70rpx;
			font-weight: 600;
			font-size: 30rpx;
		}
		.tab{
			position: absolute;
			left: 0;
			top: 0;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			background: rgba(250, 129, 90, 0.7);
			color: #fff;
			font-size: 22rpx;
		}
	}
	.box.more{
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text{
			font-size: 28rpx;
		}
	}
}
</style>