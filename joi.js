const Joi = require('joi');

//定义对象的验证规则，验证规则本身也是对象
const schema = Joi.object({
  username: Joi.string().min(2).max(5).error(new Error('错误'))
});

// 验证通过返回验证对象，验证不通过返回错误信息
  const {error, value} = schema.validate({username: 'a'});
  console.log(error.message);
  console.log(value);
  console.log('验证通过');

// run();
