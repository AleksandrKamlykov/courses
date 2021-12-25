const {Schema, model} = require('mongoose')

const news = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    imageUrl: String

})

module.exports = model('News', news)