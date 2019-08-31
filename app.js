const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const nunjucks = require('nunjucks');
const favicon = require('serve-favicon');
const logger = require('morgan');
const makeRequests = require('./middleware/make-requests');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const setLocals = require('./middleware/set-locals');

// routes
const index = require('./routes/index');
const indexDemo = require('./routes/demo/index');

const app = express();
const isDev = app.get('env') === 'development';
const componentsServedLocally = process.argv[2] === 'local';
const componentsServedOverNgrok = process.argv[2] === 'ngrok';
const gTagId = 'GTM-PQPZ36F';

const apiHost = process.env.MARIANA_API_HOST;
const isComponentsUnsecure = componentsServedLocally && (apiHost && apiHost.includes('http://'));
const normalizePort = require('./helpers/normalize-port');
const protocol = isComponentsUnsecure ? 'http' : 'https';

const localEmberDomain = process.env.LOCAL_EMBER_DOMAIN || 'localhost';

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: isDev ? 'expanded' : 'compressed',
    sourceMap: isDev
}));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

nunjucks.configure(path.join(__dirname, 'views'), {
    watch: isDev,
    noCache: isDev,
    express: app
});

const localScriptMountPaths = [
    '/default/',
    '/endpoint/:endpoint'
];

const remoteScriptMountPaths = [
    '/default/',
    '/branch/:branch',
    '/endpoint/:endpoint',
    '/version/:version',
    '/:endpoint/:versionOrBranch'
];

const demoMountPaths = (componentsServedLocally || componentsServedOverNgrok)
    ? localScriptMountPaths : remoteScriptMountPaths;

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

app.locals.componentsServedLocally = componentsServedLocally;
app.locals.componentsUnsecure = isComponentsUnsecure;
app.locals.componentsServedOverNgrok = componentsServedOverNgrok;
app.locals.componentsNotServedLocally = !(componentsServedLocally || componentsServedOverNgrok);
app.locals.localCSSHref = `${protocol}://${localEmberDomain}:4200/assets/app.css`;
app.locals.localScriptSource = `${protocol}://${localEmberDomain}:4200/assets/app.js`;
app.locals.gTagId = gTagId;

app.listen(app.get('port'), () => {
    const port = normalizePort(process.env.PORT || '8080');
    const serverLocation = `localhost:${port}`;

    console.log(`Node app is running at ${protocol}://${serverLocation}`);
    console.log(`Visit ${protocol}://${serverLocation} to view the integrations application`);
});

module.exports = app;
