// console.log(process.env);
require('dotenv').config();
var express = require('express')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var sessionMiddleware = require('./middlewares/session.middleware')
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var authMiddlewawre = require('./middlewares/auth.middleware');

var db = require('./db')

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views ', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware);

app.use(express.static("public"));


app.get('/', function(req, res) {
    res.render('index', {
        name: 'Cao'
    });
});


app.use('/users',authMiddlewawre.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, function()  {
  console.log(`Example app listening at http://localhost:` + port);
});