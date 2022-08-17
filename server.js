// const bodyParser = require('body-parser');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const error  = require('http-errors');
// //const logger = require('logger');
// const flash = require('express-flash');
// const session = require('express-session');

// // create express app
// const app = express();
// dotenv.config();

// // // setup server port
// const port = process.env.APP_PORT;

// //routes path
// const userRoute = require('./src/user/routes/user.routes');
// //const postRoute = require('./src/post/routes/post.routes');


// //parse request of content type app/urlencoded
// app.use(bodyParser.urlencoded({ extended : true}));

// //parse request of content-type app/json
// app.use(bodyParser.json());

// // using middleware - create routes
// app.use(cors());
// //app.use(logger('dev'));
// app.use(flash());
// app.use(session({
//     secret: '123458cat',
//     resave: false,
//     saveUninitialized : true,
//     cookie : {maxAge:60000}
// }));

// app.use('/api/user',userRoute);
// //app.use('/api/post',postRoute);


// app.get('/',(req,res) => {
//     res.send("hello");
// });

// //listening the port
// app.listen(process.env.APP_PORT, () => {
//     console.log(`server is running on port ${port}`);

// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');


// create express app
const app = express();
dotenv.config();

// setup server port
const port = process.env.APP_PORT;

// routes path
const userRoute = require('./src/user/routes/user.routes');
const postRoute = require('./src/post/routes/post.routes');
const profileRoute = require('./src/user/routes/profile.routes');


// parse request of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true }));

// parse request of content-type - application/json
app.use(bodyParser.json());


// using middleware - Create routes
app.use(cors());
app.use(logger('dev'));
app.use(flash());
app.use(session({
    secret : '123458cat',
    resave : false,
    saveUninitialized : true,
    cookie : {maxAge : 60000}
}));

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/profile', profileRoute);


// listening the port 
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${port}`);
});
