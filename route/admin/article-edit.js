module.exports = (req, res) => {
  //标识，表明当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';

  res.render('admin/article-edit');
}