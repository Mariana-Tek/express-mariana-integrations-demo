const express = require('express');
const expressNunjucks = require('express-nunjucks');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const makeRequests = require('./middleware/make-requests');
const sassMiddleware = require('node-sass-middleware');
const setLocals = require('./middleware/set-locals');

const index = require('./routes/index');
const indexDemo = require('./routes/demo/index');

const app = express();
const isDev = app.get('env') === 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

const njk = expressNunjucks(app, { // eslint-disable-line no-unused-vars
    watch: isDev,
    noCache: isDev
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

const demoMountPaths = [
    '/default/',
    '/endpoint/:endpoint',
    '/version/:version',
    '/:endpoint/:version'
];

app.use([demoMountPaths], setLocals, makeRequests, indexDemo);
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
