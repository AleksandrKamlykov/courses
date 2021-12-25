const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.FROM,
        subject: 'акаунт создан',
        html: `
        <h1>Добро пожаловать на наш сайт</h1>
        <p>Вы успешно создали аккаунт с email: ${email}</p>
        <hr />
        <a href='${keys.BASE_URL}'>Наш сайт</a>
        `
    }
}