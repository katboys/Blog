var co = require('co');
var thunkify = require('thunkify-wrap');
var markdown = require('markdown').markdown;

var tagModel = require('../models/tag');

module.exports = {

	list: function * () {
        var tag = this.params['tag'];
        var tagInfo = yield tagModel.findById(tag);
        console.log(tagInfo);

        var tagList = yield tagModel.fetch();

        yield this.render('tags',{
            tagInfo:tagInfo,
            tagList:tagList
        });
	},

    create: function * () {
        
        yield tagModel.save(data);
    },

    show: function * () {
        var id = this.params['id'];
        var tag = yield tagModel.findById(id);

        tag.content = markdown.toHTML(tag.content);

        yield this.render('tag',{
            tagList:[],
            tag:tag
        });
    }

};

