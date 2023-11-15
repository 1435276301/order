import request from '@/utils/request'
import type { DataList } from '@/types/menu'
// 获取菜品列表
export const getDishList = () => {
	return request<DataList>({
		url: '/getDish',
		method: 'GET'
	})
}

export type Data = {
	id: number
	categoryName: string
}

// 获取菜品分类
export const getDishCategoryAPI = () => {
	return request<Data[]>({
		url: '/getDishType',
		method: 'GET'
	})
}

// 更新售出的份数
export const updateSoldCountAPI = (id: number, sold: number) => {
	return request<Data>({
		url: '/updateSoldCount',
		method: 'POST',
		data: {
			id,
			sold
		}
	})
}
