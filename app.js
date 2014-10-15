var path = require('path');

var koa = require('koa');
var router = require('koa-router');
var render = require('koa-views');
var static = require('koa-static');
var mongoose = require('mongoose');

var routes = require('./config/routes');

var app = koa();

mongoose.connect('mongodb://localhost/Blog');

var db = mongoose.connection;
db.on('connected',function() {
    console.log("connected");  
}).on('error',function(err) {
    console.log(err);
});
app.use(static(path.join(__dirname, "/public")));

app.use(render(path.join(__dirname,"./app/views"),{default:"ejs"}));

app.use(router(app));

routes.init(app);

app.listen(3000);

