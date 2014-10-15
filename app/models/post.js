var co = require('co');
var thunkify = require('thunkify-wrap');

var Post = require('../../db/models/post');

module.exports = {

	fetch: function *() {
        var fetch = thunkify(Post.fetch,Post);
        var postList = yield fetch();
        return postList;
	},

	findById: function *(id) {
        var findById = thunkify(Post.findById,Post);
        var post = yield findById(id);
        return post;
	},

    save: function *(data) {
        var post = new Post(data);
        var save = thunkify(post.save);

        yield save();
    }

};

