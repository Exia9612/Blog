//创建用户集合
const mongoose = require('mongoose');
const Joi = require('joi');

//创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    //admin 管理员
    //normal 普通用户
    type: String,
    required: true
  },
  state: {
    type: Number,
    //0启用，1禁用
    default: 0
  }
});
//创建用户table, 返回构造函数
const User = mongoose.model('User', userSchema);

//验证用户信息模块
const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
    // password: Joi.string().regex(/^[a-zA-Z0-9]{3, 30}$/).required().error(new Error('密码格式不符合要求')),
    password: Joi.string().required().error(new Error('密码格式不符合要求')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色格式不符合要求')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
  });
  //验证新增用户表单中的格式是否正确
  const {error, value} = schema.validate(user);
  return error;
}

//创建一个用户
// User.create({
//   username: 'isaac',
//   email: 'isaac@gmail.com',
//   password: '123',
//   role: 'admin',
//   state: 0
// })

module.exports = {
  User,
  validateUser
}