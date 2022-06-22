const {Pool} = require('pg')

const db = new Pool ({
    database: 'gudang_shopee',
    port: 5432,
    user: 'postgres',
    password: 'murasakibara'
})

module.exports = db
