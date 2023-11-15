import request from '@/utils/request'

// 添加用户
export const addUserAPI = (token: string) => {
	return request({
		url: '/addUser',
		method: 'POST',
		data: {
			token
		}
	})
}

// 查询用户id
export const getUserAPI = (token: string) => {
	return request<
		{
			id: number
			token: string
		}[]
	>({
		url: '/findUserId',
		method: 'GET',
		data: {
			token
		}
	})
}
