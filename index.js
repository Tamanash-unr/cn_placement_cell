const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const env = require('./config/environment');
const path = require('path');

// Used for Session Cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// Setup for SCSS
const sassMiddleware = require('node-sass-middleware');

// Setup for Flash Messages
const flash = require('connect-flash');

// Setup for Custom Middleware
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// Parsing POST requests
app.use(express.urlencoded());

// Setup Cookie Parser
app.use(cookieParser());

// Setup for accessing Static Files
app.use(express.static('.' + env.asset_path));

// Setup Express Layout
app.use(expressLayouts);

// Extract Style and Scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: "codeial",
    // TODO - Change Secret key before Deployment in Production Mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // Mongo Store is used to store the session cookie in the DB
    store: MongoStore.create({
        client: db.getClient(),
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash)

// Use Express Router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error Connecting to Server : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});