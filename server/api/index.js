/* eslint-disable @typescript-eslint/no-var-requires */
const db = require('../db/index')
const express = require('express')
const router = express.Router()
router.post('/', () => {
	console.log(123)
})

module.exports = router
