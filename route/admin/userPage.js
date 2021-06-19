const { User } = require('../../module/user');

module.exports = async (req, res) => {
  //标识，表明当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';

  //  接收客户端传过来的当前页参数
  let page = req.query.page || 1;
  //每一页显示的数据条数
  let pagesize = 2;
  //查询用户总数
  let count = await User.countDocuments({});
  let totalPages = Math.ceil(count / pagesize);
  let start = (page - 1) * pagesize;

  //将全部用户信息从数据库中查询出来
  let users = await User.find({}).limit(pagesize).skip(start);
  //渲染用户列表模版
  res.render('admin/user', {
    users,
    page,
    totalPages
  });
}