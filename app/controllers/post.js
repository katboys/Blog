var co = require('co');
var thunkify = require('thunkify-wrap');

var postModel = require('../models/post');

module.exports = {

	home: function * () {
        var postList = yield postModel.fetch();

        yield this.render('index',{
            tagList:[],
            postList:postList
        });
	},

	list: function * () {
		yield this.render('list', []);
	},

    create: function * () {
       
    },

    show: function * () {
        var id = this.params['id'];
        console.log(id);
        var post = yield postModel.findById(id);

        yield this.render('post',{
            tagList:[],
            post:post
        });
    }

};

