module.exports = (req, res) => {
	// 删除session
	req.session.destroy(function () {
		// 删除cookie
		res.clearCookie('connect.sid');
		// 重定向到用户登录页面
		res.redirect('/admin/login');
		// 清除模板中的用户信息
		// 解决用户退出后，评论区依然保留问题(因为显示评论区与否是判断userInfo是否存在)
		req.app.locals.userInfo = null;
	});
}