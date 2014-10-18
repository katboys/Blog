var co = require('co');
var thunkify = require('thunkify-wrap');

var postModel = require('../models/post');
var tagModel = require('../models/tag');

module.exports = {

    render: function * () {
        yield this.render('write');
    },

    add: function * () {
        var data = this.request.body;

        var post = yield postModel.save(data);

		var tag = yield tagModel.save([{
			name: "flatten",
			posts: [{
                id:post._id,
                name:post.name
			}]
		}]);

        this.status = 200;

        this.body = {
            "code": "S_OK"
        };
    }
};


