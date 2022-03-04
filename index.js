const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const newsRoutes = require('./routes/news')

const ordersRoutes = require('./routes/orders')
const authRoutes = require("./routes/auth")
const session = require("express-session")
const MongoStore = require("connect-mongodb-session")(session)
const varMiddleware = require("./middleware/variables")
const userMiddleware = require("./middleware/user")

const keys = require('./keys')

const { urlDB, sessionSecret } = keys
const PORT = process.env.PORT || 8080
const app = express()


const store = new MongoStore({
    collection: "session",
    uri: urlDB
})

//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(express.json());
app.use(varMiddleware)
app.use(userMiddleware)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use("/auth", authRoutes)
app.use('/news', newsRoutes)

async function start() {

    try {
        await mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`server running port: ${PORT}`)
        })
    } catch (err) {
        throw err
    }
}

start()
