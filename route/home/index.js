const { Article } = require('../../module/article');
//分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  const page = req.query.page;

  //查询文章集合数据
  //调用ecec执行数据库分页请求
  //JSON.parse()里的参数只能是string类型,但是pagination返回的不是string类型，所以需要先转换成字符串，在parse。
  let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
  let str = JSON.stringify(result);
  let json = JSON.parse(str);
  // res.send(json);

  res.render('home/default.art', {
    result: json
  });
}