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

    save: function *(tags) {
        var findByName = thunkify(Tag.findByName,Tag);
        //tags = tags.map(function(tag) {
            var tag = tags[0];
            var tagInfo = yield findByName(tag.name);
            if (!tagInfo) {
                tagInfo = _.extend(tag);
            } else {
                tagInfo.posts = tagInfo.posts.concat(tag.posts) ;
            }
            //return tagInfo;
        //});

        tag = new Tag(tag);
        var save = thunkify(tag.save,tag);
        var result = yield save();
        //tags.forEach(function(tag) {
            //var tag = new Tag(tag);
            //tag.save();
        //});
    }

};

