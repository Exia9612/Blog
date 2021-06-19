const { User } = require('../../module/user');

module.exports = async (req, res) => {
  //标识，表明当前访问的是用户列表页面
  req.app.locals.currentLink = 'user';
  //获取地址栏中的id参数
  const {message, id} = req.query;

  if (id) {
    //有id, 修改操作
    let user = await User.findOne({_id: id});
    res.render('admin/user-edit', {
      message,
      user,
      link: `/admin/user-modify?id=${id}`,
      button: '修改'
    });
  } else {
    //添加操作
    res.render('admin/user-edit', {
      message,
      link: '/admin/user-edit',
      button: '添加'
    });
  }
}