// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql')
const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'table119'
})

module.exports = db
