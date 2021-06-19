const { User } = require('../../module/user');

module.exports = async (req, res, next) => {
  //接收客户端请求参数
  const { username, email, role, state } = req.body;
  const id = req.query.id;

  //查询修改用户
  let user = await User.findOne({_id: id});
  //密码比对
  if (user.password == req.body.password) {
    //更新用户数据
    await User.updateOne({_id: id}, {
      username,
      email,
      role,
      state
    });
    res.redirect('/admin/user');
  } else {
    let obj = {
      path: '/admin/user-edit',
      message: '密码比对失败',
      id
    }
    next(JSON.stringify(obj));
  }
}