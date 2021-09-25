const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 50
        }).then(x => {
            console.log(`${x.connections[0].name}, MongoDB connecting successfull`)
        })
    } catch (error) {
        console.error('Error connecting to mongo', error);
    }
}
connectDB();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000
}));
app.use(cookieParser());

app.use(express.static('client/build'))
global.__basedir = __dirname;

const usersRouter = require('./client/src/server/user/api');
app.use('/api/users', usersRouter);

const productsRouter = require('./client/src/server/products/api');
app.use('/api/products', productsRouter);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 3018;
app.listen(port, () => {
    console.log(`LumiCommerce Server Running at port: ${port}`)
});