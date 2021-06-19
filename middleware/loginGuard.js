const guard = (req, res, next) => {
  //判断用户是否访问的是登陆页面
  //判断用户登陆状态，如果用户是登陆的放行请求，否则重定向到登陆页面
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login');
  } else if (req.session.role == 'normal') {
    return res.redirect('/home/');
  } else {
    next();
  }
}

module.exports = guard;