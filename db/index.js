// 导入mysql 数据库
const mysql = require('mysql');
// 创建与数据库 的链接
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'back_system'
})
// 对外暴露数据
module.exports = db
