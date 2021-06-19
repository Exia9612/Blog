//链接数据库
const mongoose = require('mongoose');
//使用生产环境配置信息链接数据库
const config = require("config");

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('mogodb connect success');
}).catch(() => {
  console.log('mongodb connect fail');
})