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
		apiGetClassList
	} from '@/api/apis.js'
	import {
		onLoad,
		onReachBottom,
		onUnload
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	const classList = ref([])
	const noData = ref(false)
	const qryParams = {
		pageNum: 1,
		pageSize: 12
	}
	onLoad((e) => {
		const {
			classId,
			name
		} = e
		qryParams.classid = classId
		uni.setNavigationBarTitle({
			title: name
		})

		getClassList(qryParams)
	})

	const getClassList = async (params) => {
		const res = await apiGetClassList({
			...params
		})
		classList.value = classList.value.concat(res.data)
		uni.setStorageSync('storeClassList',classList.value)
		if (qryParams.pageSize > res.data.length) noData.value = true
	}
	onReachBottom(() => {
		if (noData.value) return
		qryParams.pageNum++
		getClassList(qryParams)
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