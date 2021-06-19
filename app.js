const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
const morgan = require('morgan');
const config = require('config');
//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//创建网站服务器
const app = express();
//数据库链接
//引入时直接执行文件
require('./module/connect');

//处理post请求参数，bodyParser.urlencoded方法处理所有客户端请求
//该方法会在req中添加body属性，是请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session，session函数对所有客户端请求req添加session属性，并将sessionid
//存储在服务器端和客户端的cookie中。当客户端再次发送请求时在服务器端查找相应的sessionid
/* 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生成一个类似于 key,value 的键值对，然后将 key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带 key(cookie)， 找到对应的 session(value)。 客户的信息都保存在 session 中 */
app.use(session({ secret: 'secret key' }));

//配置模版路径
app.set('views', path.join(__dirname, 'views'));
//配置模版默认后缀
app.set('view engine', 'art');
//配置.art文件使用的模版引擎
app.engine('art', require('express-art-template'));

//向模版中导入外部变量
template.defaults.imports.dateFormat = dateFormat;
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//config模块会自动对运行环境进行判断
console.log(config.title);

//获取系统环境变量, process是global对象下的属性
//mac中添加环境变量：在.bash_profile中export 变量名：值，在.zshrc中source .bash_profile
//写在路由前
if (process.env.NODE_ENV == 'development') {
  console.log('development environment');
  // 将客户端信息打印到控制台
  app.use(morgan('dev'));
}

//拦截请求判断用户登陆状态
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配一级路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
  //next(arg)：将异步错误抛出使其能被错误处理中间件捕获;不加参数将控制权交给下一个中间件
  console.log(err);
  const result = JSON.parse(err);
  //拼接参数
  let paras = [];
  for (let attr in result) {
    if (attr != 'path') {
      paras.push(attr + '=' + result[attr]);
    }
  }
  res.redirect(`${result.path}?${paras.join('&')}`);
})

app.listen(80);
console.log('serve start');