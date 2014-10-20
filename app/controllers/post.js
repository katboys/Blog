var co = require('co');
var thunkify = require('thunkify-wrap');
var markdown = require('markdown').markdown;

var postModel = require('../models/post');
var tagModel = require('../models/tag');

module.exports = {

	home: function * () {
		var postList = yield postModel.fetch();

		postList = postList.map(function(post) {
			post.content = markdown.toHTML(post.content);
			return post;
		});

		var tagList = yield tagModel.fetch();

		yield this.render('index', {
			tagList: tagList,
			postList: postList
		});
	},

	list: function * () {
        var postList = yield postModel.fetch();

		postList = postList.map(function(post) {
			post.content = markdown.toHTML(post.content);
			return post;
		});

		var tagList = yield tagModel.fetch();

		yield this.render('list', {
			tagList: tagList,
			postList: postList
		});
	},

	show: function * () {
		var id = this.params['id'];
        console.log(id);
		var post = yield postModel.findById(id);

        console.log(JSON.stringify(post));
		post.content = markdown.toHTML(post.content);

		yield this.render('post', {
			tagList: [],
			post: post
		});
	},

    del: function * () {
        var id = this.request.body['id'];
        
        var result = yield postModel.del(id);

        this.status = 200;
        this.body = {
            "code":"S_OK"
        };
    }
};

