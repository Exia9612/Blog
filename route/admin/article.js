const { Article } = require('../../module/article');
const pageination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  //接收客户端传递过来的页码
  const page = req.query.page;
  //标识，表明当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';

  //查询所有文章数据, 返回moogoose文档对象，art-template无法解析
  //Population 可以自动替换 document 中的指定字段，替换内容从其他 collection 获取
  //page:当前页，size每一页显示条数，display显示多少页码
  let articles = await pageination(Article).find().page(page).size(2).display(3).populate('author').exec(); 
  let str = JSON.stringify(articles);
  let json = JSON.parse(str);
  // res.send(articles)
  // 渲染文章列表页面模板
  //https://blog.csdn.net/qq_49002903/article/details/112541719
  res.render('admin/article.art', {
      articles: json
  });
}
