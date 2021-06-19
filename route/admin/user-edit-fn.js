//引入用户table构造函数
const { User, validateUser } = require('../../module/user');

module.exports = async (req, res, next) => {
  let error = validateUser(req.body);
  if (error) {
    //验证未通过，重定向回用户添加页面
    //JSON.stringify:将对象类型转换为字符串类型
    return next(JSON.stringify({path: '/admin/user-edit', message: error.message}));
  }
  //根据邮箱查询用户是否已经存在
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
    return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已被占用'}));
  }
  //若用户不存在，将新用户添加到数据库当中
  await User.create(req.body);
  res.redirect('/admin/user');
}