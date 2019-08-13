const model = require('../model');

module.exports = {
    'GET /': async (ctx, next) => {
        let Poetry = model.Poetry;
        await Poetry.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function (poetrys) {
            ctx.render('index.html', {
                title: 'Welcome',
                poetry: poetrys[0]
            });
        });


    }
}