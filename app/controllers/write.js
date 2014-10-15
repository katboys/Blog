var co = require('co');
var thunkify = require('thunkify-wrap');

var postModel = require('../models/post');

module.exports = {

    render: function * () {
        yield this.render('write');
    }
};


