var _ = require('underscore');
var co = require('co');
var thunkify = require('thunkify-wrap');

var Tag = require('../../db/models/tag');

module.exports = {

	fetch: function *() {
        var fetch = thunkify(Tag.fetch,Tag);
        var tagList = yield fetch();
        return tagList || [];
	},

	findByName: function *(name) {
        var findByName = thunkify(Tag.findByName,Tag);
        var tag = yield findByName(name);
        return tag;
	},

	findById: function *(id) {
        var findById = thunkify(Tag.findById,Tag);
        var tag = yield findById(id);
        return tag;
	},

    save: function *(tag) {
        var findByName = thunkify(Tag.findByName,Tag);

        var tagInfo = yield findByName(tag.name);

        if (!tagInfo) {
            tagInfo = new Tag(tag);
        } else {
            tagInfo.posts = tagInfo.posts.concat(tag.posts);
        }

        var save = thunkify(tagInfo.save,tagInfo);
        var result = yield save();
        return result;
    }

};

