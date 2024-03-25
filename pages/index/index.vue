<template>
	<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="推荐"></custom-nav-bar>
	<!-- #endif -->
	
	
	<view class="homeLayout pageBg">
		<view class="banner">
			<swiper circular indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
				
			</swiper>
			
			
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper autoplay :interval="1500" :duration="300" circular vertical>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator url="/pages/notice/detail">
							{{ item.title }}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20" color="#333"></uni-icons>
			</view>
			
		</view>
		
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20" color="#28b235"></uni-icons>
						<view class="text">
							<uni-dateformat :date="new Date()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" @click="goPreivew" v-for="item in randomList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<view class="more">More +</view>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { apiGetBanner,apiGetNotice,apiGetClassify,apiDetailWall, apiGetDayRandom } from '@/api/apis.js'
import { ref } from 'vue';
	const bannerList = ref([])
	const noticeList = ref([])
	const randomList = ref([])
	const classifyList = ref([])
	const getBanner = async() => {
		const res = await apiGetBanner()
		bannerList.value = res.data
	}
	const getNotice = async() =>{
		const res = await apiGetNotice({select:true})
		noticeList.value = res.data
	}
	const getRandom = async() =>{
		const res = await apiGetDayRandom()
		randomList.value = res.data
	}
	const getClassify = async() =>{
		const res = await apiGetClassify({select:true})
		classifyList.value = res.data
	}
	const goPreivew = () =>{
		uni.navigateTo({
			url:'/pages/preview/preview'
		})
	}
	getBanner()
	getNotice()
	getRandom()
	getClassify()
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		height: 340rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 100%;
			&-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		display: flex;
		align-items: center;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color;
				}
			}
			
			.text{
				color: $brand-theme-color;
				font-size: 28rpx;
				font-weight: 600;
			}
		}
		.center{
			flex:1;
			height: 100%;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.select{
		padding-top: 50rpx;
		.date{
			display: flex;
			align-items: center;
			.text{
				margin-left: 10rpx;
				color: $brand-theme-color;
			}
		}
		.content{
			width: 720rpx;
			padding: 30rpx 0 0 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{margin-right: 30rpx;}
			}
		}
	}
	.theme{
		padding-top: 50rpx 0;
		.more{
			font-size: 32rpx;
			color: #888;
		}
		.content{
			padding: 30rpx 30rpx 0;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
