const { Router } = require('express')
const News = require('../models/news')
const router = Router()
//const http = require("request")
const axios = require('axios')


router.get('/', async (req, res) => {
    const news = await News.find()
    res.send(news)
})

// router.get('/create', async (req, res) => {
//     res.render('createNews', {
//         title: 'create news',
//         isCreateNews: true,
//     })
// })

router.post('/create', async (req, res) => {

    const news = new News({
        title: req.body.title,
        body: req.body.body,
        creator: req.body.creator,
        imageUrl: req.body.imageUrl
    })


    try {
        await news.save()

        let mess = `
        ${req.body.creator}
        ${req.body.title}
        ${req.body.body}
        `
        // axios.get(`https://api.telegram.org/bot1831614888:AAE41QAzdDu67eYpu-vLPrny0lb4Oy46_TE/sendMessage?chat_id=359806396&text=${mess}`)
        // function (error, response, body) {
        //
        //     console.log('error:', error);
        //     console.log('statusCode:', response && response.statusCode);
        //     console.log('body:', body);
        //     if(response.statusCode===200){
        //         response.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
        //     }
        //     if(response.statusCode!==200){
        //         response.status(400).json({status: 'error', message: 'Произошла ошибка!'});
        //     }}
        //  )



        res.redirect('/news')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router