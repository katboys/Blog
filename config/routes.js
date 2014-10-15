var PostController = require('../app/controllers/post');
var WriteController = require('../app/controllers/write');

exports.init = function(app) {

	//首页
	app.get('/', PostController.home);

	//首页
	app.get('/home', PostController.home);

	//列表页
	app.get('/posts/list', PostController.list);

	//列表页
	app.get('/posts/page/:page', PostController.list);

	//所有列表
	//app.get('/posts/all', PostController.all);
	//文章
	app.get('/posts/:id', PostController.show);

	//分类
	//app.get('/tags/:tag', PostController.classify);
	//写文章
	app.get('/write', WriteController.render);

	//保存文章
	//app.post('/posts/write', WriteController.post);
};

