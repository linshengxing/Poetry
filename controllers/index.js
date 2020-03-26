const model = require('../model');

module.exports = {
    'GET /': async (ctx, next) => {
        let Poetry = model.Poetry;
        await Poetry.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        }).then(function (poetrys) {
            // 索引超过诗文的总数则重置，再显示诗文
            var showIndex = Math.floor(Math.random() * poetrys.length);

            ctx.render('index.html', {
                title: '诗词杂货铺',
                poetry: poetrys[showIndex],
                total: poetrys.length
            });
        });
    }
}