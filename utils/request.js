
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi'
export function request(config = {}){
	return new Promise((resolve,reject)=>{
		let { url,method ='GET' ,data = {},header = {}} = config
		url = BASE_URL + url
		header['asscess-token'] = ''
		uni.request({
			url,
			data,
			method,
			header,
			success:res => {
				if(res.data.errCode === 0){
					resolve(res.data)
				} else if(res.data.errCode === 400){
					uni.showModal({
						title:'错误提示',
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				} else {
					reject(res.data)
				}
			},
			fail: err =>{
				reject(err)
			}
		})
	})
}