const { Router } = require("express");
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require("../models/user");
const fs = require('fs');
const path = require('path');
const router = Router();
const keys = require('../keys')
//const regEmail = require('../emails')

const { SEND_GRID_API_KEY } = keys

// const transporter = nodemailer.createTransport(sendgrid({
//     auth: { api_key: SEND_GRID_API_KEY }
// }))

// async function appendFileAsync(path, data) {
//     return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
//         if (err) {
//             return reject(err.message)
//         }
//         resolve()
//     }))
// }




router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login")
    })
})

router.post('/login', async (req, res) => {
    try {

        const { email, pass } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = pass === candidate.pass
            if (areSame) {

                // fs.appendFileAsync(path.resolve(__dirname, 'logs.txt'), `\r user: ${email} login at: ${new Date} `);

                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(

                    res.send({ result: true })
                )
            }
        } else res.send({ result: false })


    } catch (e) {
        console.log(e)
    }

})

router.post("/register", async (req, res) => {
    try {
        const { email, name, pass, repeat } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.redirect("/auth/login#register")
        } else {
            const user = new User({
                email, name, pass, cart: { items: [] }
            })
            await user.save()
            res.redirect("/auth/login#login");
            // await transporter.sendMail(regEmail(email))
        }
    } catch (e) {
        console.log(e)
    }
})



module.exports = router