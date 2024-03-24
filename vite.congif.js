import {defineConfig} from 'vite'
import uni from '@dcloudio/uni-app'
import AutoImport from 'unplugin-auto-import'
export default defineConfig({
	plugins:[
		uni(),
		AutoImport({
			import:['vue','uni-app']
		})
	]
})