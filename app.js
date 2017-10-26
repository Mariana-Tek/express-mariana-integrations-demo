const express = require('express');
const expressNunjucks = require('express-nunjucks');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

const index = require('./routes/index');
const indexDemo = require('./routes/demo/index');

const app = express();
const isDev = app.get('env') === 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Router: Endpoint

const endpointRouter = express.Router({mergeParams: true});

endpointRouter.get('/:endpoint', function(req, res, next) {
  res.render('demo/index', { endpoint: req.params.endpoint });
});

const setLocals = function (req, res, next) {
    res.locals.baseUrl = req.baseUrl;
    res.locals.endpoint = req.params.endpoint ? req.params.endpoint : 'cousteau-r45kxk';
    res.locals.siteTitle = "Ohami Yoga";
    res.locals.version = req.params.version ? req.params.version : '*.*.*';

    next()
};


app.use(['/default/'], setLocals, indexDemo);
app.use(['/endpoint/:endpoint'], setLocals, indexDemo);
app.use(['/version/:version'], setLocals, indexDemo);
app.use(['/:endpoint/:version'], setLocals, indexDemo);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
