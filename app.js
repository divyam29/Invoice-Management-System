require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const Category = require('./models/category');
var MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const favicon = require('serve-favicon');

const app = express();
require('./config/passport');

// mongodb configuration
connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/images/favicon-32x32.png'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
        //session expires after 3 hours
        cookie: { maxAge: 60 * 1000 * 60 * 3 },
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables across routes
app.use(async (req, res, next) => {
    try {
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.currentUser = req.user;
        const categories = await Category.find({}).sort({ title: 1 }).exec();
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// add breadcrumbs
get_breadcrumbs = function (url) {
    var rtn = [{ name: 'Home', url: '/' }],
        acc = '', // accumulative url
        arr = url.substring(1).split('/');

    for (i = 0; i < arr.length; i++) {
        acc = i != arr.length - 1 ? acc + '/' + arr[i] : null;
        rtn[i + 1] = {
            name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
            url: acc,
        };
    }
    return rtn;
};
app.use(function (req, res, next) {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);
    next();
});

//routes config
const indexRouter = require('./routes/index');
const pagesRouter = require('./routes/pages');
const usersRouter = require('./routes/user');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/pages', pagesRouter);
app.use('/user', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error',{pageName: "404"});
});

var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
