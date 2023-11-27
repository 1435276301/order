// 请求基地址
const baseIp = import.meta.env.BASE_IP
const baseUrl = baseIp
// 拦截器配置
const httpInterceptor = {
	// 拦截前触发
	invoke(options: any) {
		// 1.非http开头需拼接地址
		if (!options.url.startsWith('http')) {
			options.url = baseUrl + options.url
		}
		// 2.请求超时
		options.timeout = 5000
		// 3.添加小程序请求头表示
		options.header = {
			'source-client': 'miniapp',
			...options.header
		}
	}
}
// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
	code: string
	msg: string
	data: T
}
// 2.2 添加类型，支持泛型
const request = <T>(options: UniApp.RequestOptions) => {
	// 1. 返回 Promise 对象
	return new Promise<Data<T>>((resolve, reject) => {
		uni.request({
			...options,
			// 响应成功
			success(res) {
				// 状态码 2xx，参考 axios 的设计
				if (res.statusCode >= 200 && res.statusCode < 300) {
					// 2.1 提取核心数据 res.data
					return resolve(res.data as Data<T>)
				} else if (res.statusCode === 401) {
					// 401错误  -> 清理用户信息，跳转到登录页
				} else {
					// 其他错误 -> 根据后端错误信息轻提示
					uni.showToast({
						icon: 'none',
						title: (res.data as Data<T>).msg || '请求错误'
					})
					return reject(res)
				}
			},
			// 响应失败
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '网络错误，换个网络试试'
				})
				return reject(err)
			}
		})
	})
}

export default request
