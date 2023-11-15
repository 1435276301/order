/* eslint-disable @typescript-eslint/no-var-requires */
// const db = require('../db/index')
const express = require('express')
const db = require('../db/index')
const router = express.Router()

// 获取菜品列表
router.get('/getDish', (req, res) => {
	db.query('select * from `dishes`', (err, data) => {
		if (err) throw err
		res.send({ msg: '成功', code: 200, data })
	})
})

// 获取菜品分类
router.get('/getDishType', (req, res) => {
	db.query('select * from `category`', (err, data) => {
		if (err) throw err
		res.send({ msg: '成功', code: 200, data })
	})
})

// 创建或更新订单
router.post('/createOrder', (req, res) => {
	const find = 'select * from `order` where orderNumber = ?'
	db.query(find, [req.body.orderNumber], (err, data) => {
		if (err) throw err
		if (data.length > 0) {
			const update = 'update `order` set ? where orderNumber = ?'
			db.query(update, [req.body, req.body.orderNumber], (err) => {
				if (err) throw err
				res.send({ msg: '成功', code: 200 })
			})
		} else {
			const sql = 'INSERT INTO `order` set ?'
			console.log(req.body)
			db.query(sql, req.body, (err) => {
				if (err) throw err
				res.send({ msg: '成功', code: 200 })
			})
		}
	})
})

// 更新售出的份数
router.post('/updateSoldCount', (req, res) => {
	const sql = 'UPDATE  `dishes` SET sold = sold + ' + req.body.sold + ' WHERE id = ' + req.body.id
	db.query(sql, (err) => {
		if (err) throw err
		res.send({ msg: '成功', code: 200 })
	})
})

// 添加用户信息
router.post('/addUser', (req, res) => {
	const sql = 'INSERT INTO usertoken (token) VALUES (?)'
	db.query(sql, req.body.token, (err) => {
		if (err) throw err
		res.send({ msg: '成功', code: 200 })
	})
})

// 查找用户id
router.get('/findUserId', (req, res) => {
	const sql = 'select * from usertoken where token = ?'
	db.query(sql, req.query.token, (err, data) => {
		if (err) throw err
		res.send({ msg: '成功', code: 200, data })
	})
})

// 获取用户历史订单
router.get('/getUserOrder', (req, res) => {
	const sql = 'select * from `order` where userId = ?'
	db.query(sql, req.query.userId, (err, data) => {
		if (err) throw err
		res.send({ msg: '获取订单成功', code: 200, data })
	})
})
module.exports = router
