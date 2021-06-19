const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../module/article');

module.exports = async (req, res) => {
  //req.body不能处理二进制形式传过来的表单参数
  //1 创建表单解析对象
  const form = new formidable.IncomingForm();
  //2 配置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  //3 保留上传文件后缀
  form.keepExtensions = true;
  //4 解析表单
  /*使用form解析包含二进制文件的表单数据。表单数据从req中获取后解析，
  解析成功后调用回调函数。fields是对象类型，保存了普通的表单数据，
  files是对象类型，保存了上传二进制文件相关的数据*/
  form.parse(req, async (error, fields, files) => {
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content: fields.content,
    });
    res.redirect('/admin/article');
    // res.send(fields);
    // res.send(files);
    // res.send('add success');
  });
}