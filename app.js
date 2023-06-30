// require method makes it mandatory to have express
// although package.json file contains express as dependency
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
const api = process.env.API_URL
app.use(cors());
app.options('*', cors());

//Routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const adminsRouter = require('./routers/admins');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//Middleware
//json data is understood front->back
app.use(express.json());
//Default setting is called tiny
app.use(morgan('tiny'));
//requires valid token validated via jwt.js in helpers folder
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);


//Routers
//B/C path is defined here, router only has to declare path as '/'
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/admins`, adminsRouter)



//Can add option if can't connect to db due to errors
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Databse Connection is ready...')
})
.catch(() => {
    console.log(err);
})

const PORT = process.env.PORT || 3000

// port, call-back upon successful connect to the port
app.listen(PORT, () =>{
    console.log('server is running http://localhost:3000');
})