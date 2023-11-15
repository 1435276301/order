import type { DataList } from '@/types/user'
import request from '@/utils/request'

// 创建订单
export const createOrderAPI = (data: any) => {
	return request({
		url: '/createOrder',
		method: 'POST',
		data
	})
}

// 获取用户订单
export const getUserOrderAPI = (userId: number) => {
	return request<DataList>({
		url: '/getUserOrder',
		method: 'GET',
		data: {
			userId
		}
	})
}
