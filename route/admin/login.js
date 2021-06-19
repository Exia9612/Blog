//导入User表
const { User } = require('../../module/user');

const login = async (req, res) => {
  //接收请求参数
  const { email, password } = req.body;
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render('admin/error', { msg: '邮件或密码错误'});
  }
  //根据邮箱查找用户
  //如果没有查询到用户，user为空；否则user为查询到的用户信息对象
  let user = await User.findOne({email});
  if (user) {
    //客户端密码和数据库密码比对
    if (password == user.password) {
      //将用户名存储在请求对象中
      req.session.username = user.username;
      //将用户角色存储在session对象中
      req.session.role = user.role;
      req.app.locals.userInfo = user;
      //对用户角色进行判断
      if (user.role == 'admin') {
        //重定向到用户列表页
        res.redirect('/admin/user');
      } else {
        res.redirect('/home/');
      }
    } else {
      res.status(400).render('admin/error', { msg: '邮件或密码错误'});
    }
  } else {
    res.status(400).render('admin/error', { msg: '邮件或密码错误'});
  }
}

module.exports = login;