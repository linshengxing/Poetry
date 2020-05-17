const model = require('../model');
const gm = require('gm');
const send = require('koa-send');

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
            var content = poetrys[showIndex].content;
            gm('./static/img/background1.png')
                .font('./static/fonts/chinese.stxingka.ttf')
                .fontSize(40)
                .drawText(0, 0, content, 'center')
                .write('./static/img/draw.jpg', function (err) {
                    console.log(err);
                });
            ctx.render('index.html', {
                title: '诗词杂货铺',
                poetry: poetrys[showIndex],
                total: poetrys.length
            });
        });
    },
    'GET /download': async (ctx, next) => {
        let imgPath = './static/img/draw.jpg';
        ctx.attachment(imgPath);
        await send(ctx, imgPath);
    }
}