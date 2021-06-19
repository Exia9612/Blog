//引入mongoose模块
//创建文章集合规则
//根据规则创建集合
//将集合规则作为模块成员进行导出
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    //user是_id字段
    ref: 'User',
    required: [true, '请填写作者']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = {
  Article
};