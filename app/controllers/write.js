var co = require('co');
var thunkify = require('thunkify-wrap');

var postModel = require('../models/post');

var tagController = require("./tag");

module.exports = {

    render: function * () {
        yield this.render('write',{
            post:{}
        });
    },

    show: function * () {
        var id = this.params['id'];

        var post = yield postModel.findById(id);

        yield this.render('write',{
            post: post
        });
    },
    add: function * () {
        var data = this.request.body;

        var post = yield postModel.save(data);

        yield tagController.add([{
			name: post.tags,
			posts: [{
                post:post._id,
                title:post.title
			}]
		}]);

        this.status = 200;

        this.body = {
            "code": "S_OK"
        };
    }
};


