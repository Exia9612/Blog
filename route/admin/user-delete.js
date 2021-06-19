const { User } = require('../../module/user');

module.exports = async (req, res) => {
  //获取要删除的用户id
  //请求方式为get的表单参数，默认会把参数放在url中
  //根据id删除用户
  await User.findOneAndDelete({_id: req.query.id});
  res.redirect('/admin/user');
}