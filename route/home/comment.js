//导入评论集合构造函数
const { Comment } = require('../../module/comment');

module.exports = async (req, res) => {
  //接收客户端请求参数
  const { content, uid, aid } = req.body;
  //根据评论信息构建tuple
  await Comment.create({
    content: content,
    uid: uid,
    aid: aid,
    time: new Date()
  });
  res.redirect('/home/article?id=' + aid);
}