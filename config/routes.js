var PostController = require('../app/controllers/post');
var WriteController = require('../app/controllers/write');
var TagController = require('../app/controllers/tag');
var UserController = require('../app/controllers/user');

exports.init = function(app) {

	//首页
	app.get('/', PostController.home);

	//首页
	app.get('/home', PostController.home);

	//列表页
	app.get('/posts/list', PostController.list);

	//列表页
	app.get('/posts/page/:page', PostController.list);

	//文章
	app.get('/posts/:id', PostController.show);

	//分类
	app.get('/tags/:tag', TagController.list);

	//写文章
	app.get('/write', WriteController.render);

	//编辑文章
	app.get('/posts/edit/:id', WriteController.show);

	//删除文章
	app.post('/posts/delete', PostController.del);

	//保存文章
	app.post('/posts/write', WriteController.add);

	//关于我
	app.get('/about', UserController.show);
};

