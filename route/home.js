//创建博客展示页面路由
const express = require('express');
//创建博客展示页面路由
const home = express.Router();

//博客前台展示页面
home.get('/', require('./home/index'));

//文章详情展示页面
home.get('/article', require('./home/article'));

//创建评论功能路由
home.post('/comment', require('./home/comment'));

module.exports = home;
