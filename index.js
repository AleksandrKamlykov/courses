const express = require('express')
// const Handlebars = require('handlebars')
// const exphbs = require('express-handlebars')
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const newsRoutes = require('./routes/news')

const User = require("./models/user")
const ordersRoutes = require('./routes/orders')
const authRoutes = require("./routes/auth")
const session = require("express-session")
const MongoStore = require("connect-mongodb-session")(session)
const varMiddleware = require("./middleware/variables")
const userMiddleware = require("./middleware/user")

const keys = require('./keys')

const { urlDB, PORT, sessionSecret } = keys

const app = express()

// const hbs = exphbs.create({
//     defaultLayout: 'main',
//     extname: 'hbs',
//     handlebars: allowInsecurePrototypeAccess(Handlebars)
// })

// app.engine('hbs', hbs.engine)
// app.set('view engine', 'hbs')
// app.set('views', 'views')

const store = new MongoStore({
    collection: "session",
    uri: urlDB
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', homeRoutes)
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
        //      const candidate = await  User.findOne()
        // if(!candidate){
        //     const user = new User({
        //         email: "kamlyk@email.com",
        //         name: "aleksandr",
        //         cart: {items:[]}
        //     })
        //     await user.save()
        //}

        app.listen(PORT, () => {
            console.log(`server running port: ${PORT}`)
        })
    } catch (err) {
        throw err
    }
}

start()
