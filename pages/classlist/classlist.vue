<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' :'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom">
			
		</view>
	</view>
</template>

<script setup>
	import {
		apiGetClassList,
		apiGetHistoryList
	} from '@/api/apis.js'
	
	import {
		onLoad,
		onReachBottom,
		onUnload,
		onShareAppMessage,onShareTimeline
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	import { goToHome } from '@/utils/common.js'
	const classList = ref([])
	const noData = ref(false)
	const qryParams = {
		pageNum: 1,
		pageSize: 12
	}
	let pageName = ''
	onLoad((e) => {
		const {
			id,
			name,
			type
		} = e
		if(!id) {
			goToHome()
			return
		}
		if(type) qryParams.type = type
		if(id) qryParams.classid = id
		
		pageName = name
		uni.setNavigationBarTitle({
			title: name
		})

		getClassList(qryParams)
	})

	const getClassList = async (params) => {
		let res;
		if(params.classid) res = await apiGetClassList({
			...params
		})
		if(params.type ) res = await apiGetHistoryList({...params})
		classList.value = classList.value.concat(res.data)
		uni.setStorageSync('storeClassList',classList.value)
		if (qryParams.pageSize > res.data.length) noData.value = true
	}
	onReachBottom(() => {
		if (noData.value) return
		qryParams.pageNum++
		getClassList(qryParams)
	})
	//分享好友
	onShareAppMessage(()=>{
		return{
			title:'呆桃的小屋',
			path:`/pages/classlist/classlist?id=${qryParams.classid}&name=${pageName}`
		}
	})
	//分享朋友圈
	onShareTimeline(()=>{
		return {
			title:'呆桃的小屋',
			query: `id=${qryParams.classid}&name=${pageName}`
		}
	})
	onUnload(()=>{
		uni.removeStorageSync('storeClassList')
	})
</script>

<style lang="scss" scoped>
	.classlist {
		.content {
			padding: 5rpx;
			display: grid;
			gap: 5rpx;
			grid-template-columns: repeat(3, 1fr);

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>