const db = require('../db/index');
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
    // req 是前端传过来，也就是request，res时返回给前端的数据 ，也就是result
    const reginfo = req.body;
    // 第一步，判断前端传过来的 数据有没有空
    if (!reginfo.account || !reginfo.password) {
        return res.send({
            status: 1,
            message: '账号或者密码不能为空'
        })
    }
    // 第二部，判断前端传过来账号有没有已经村子啊数据表中
    // mysql的select 语句
    const sql = 'select * from users WHERE account = ?';
    // 第一个参数就是执行语句，第二个是参数，第三个是函数 用于处理结果
    db.query(sql, reginfo.account, (err, result) => {
        if (result.length > 0) {
            // 返回信息给前端
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        // 第三步，对密码进行加密
        // 需要使用加密中间件， bcrypt.js
        reginfo.password = bcrypt.genSaltSync(reginfo.password, 10);
        // 第四步，把账户跟密码插入到users表里
        const sql = 'insert into users SET ?'
        const identity = '用户';

        // 创建时间
        const create_time = new Date();
        db.query(sql, {
            account: reginfo.account,
            password: reginfo.password,
            // 身份
            identity,
            create_time,
            // 初始未冻结
            status: 0
        }, (err, result) => {
            // 第一个 插入失败
            // affectedRows 未影响的行数， 如果插入失败， 那么就没有影响的行数，行数不为1
            if (result.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册账号失败'
                })
            }
            return res.send({
                status: 1,
                message: '注册账号成功'
            })
        })
    })
}

exports.login = (req, res) => {
    res.send('登录')
}
