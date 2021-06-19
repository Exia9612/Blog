const { Article } = require('../../module/article');
const { Comment } = require('../../module/comment');

module.exports = async (req, res) => {
  const id = req.query.id;
  //根据id查询文章信息
  let article = (await Article.findOne({_id: id})).populate('author');
  // 查询当前文章对应的评论信息
  let comments = await Comment.find({aid: id}).populate('uid');
  let str = JSON.stringify(comments);
  let json = JSON.parse(str);

  res.render('home/article.art', {
    article: article,
    comments: json
  });
}