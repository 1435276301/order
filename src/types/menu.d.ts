export type Data = {
	category: string
	cgId: number
	id: number
	image: string
	listing: number
	name: string
	price: number
	sku: Sku
	time: string
	unit: string
	count?: number
	sold: number
}

export type DataList = Data[]

type Sku = {
	children: Children
	name: string
}[]

type Children = string[]
