require('dotenv').config()

const { Telegraf } = require('telegraf')
const API = require("covid19-api")
const api = require('covid19-api')
const { Markup } = require("telegraf")
const express = require('express')
const http = require('request')
const app = express()
const port = 8081



const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`
Привет ${ctx.message.from.first_name}
Узнай статистику по Коронавирусу.
Введи на английском название страны для получения статистики`
    ,
    Markup.keyboard([
        ["us", "India"],
        ["Ukraine", "Russia"],
    ]).resize()

))
bot.hears('hi', (ctx) => {
    console.log(ctx)
})
bot.hears("ohh", (ctx) => ctx.reply("what?"))
bot.on('text', async (ctx) => {
    let data = {}

    try {
        data = await api.getReportsByCountries(ctx.message.text)

        const formatData = `
    За всё время
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
`

        ctx.reply(formatData)
    } catch {
        ctx.reply("Такой страны не существует =(")
    }
})

bot.launch()


console.log("BOT start");


app.get('/', function(req, res,next) {
 http.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=359806396&text=any_text`, function (error, response, body) {
     //не забываем обработать отве
     console.log('error:', error);
     console.log('statusCode:', response && response.statusCode);
     console.log('body:', body);
     if(response.statusCode===200){
         res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
     }
     if(response.statusCode!==200){
         res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
     }})
    next()
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
