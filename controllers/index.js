const model = require('../model');
const gm = require('gm');
const send = require('koa-send');

module.exports = {
    'GET /': async (ctx, next) => {
        let Poetry = model.Poetry;
        var poetrys;
        await Poetry.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        }).then(function (data) {
            poetrys = data;
        });
        var showIndex = Math.floor(Math.random() * poetrys.length);
        ctx.render('index.html', {
            title: '诗词杂货铺',
            poetry: poetrys[showIndex],
            total: poetrys.length
        });
    },
    'GET /download': async (ctx, next) => {
        let imgPath = './static/img/draw.jpg';
        var content = ctx.request.query['content'];
        await drawImg(content);
        ctx.attachment(imgPath);
        await send(ctx, imgPath);
    },
    'GET /refresh': async (ctx, next) => {
        let Poetry = model.Poetry;
        var poetrys;
        await Poetry.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        }).then(function (data) {
            poetrys = data;
        });
        var showIndex = Math.floor(Math.random() * poetrys.length);
        let returnData = {
            success: true,
            data: {
                poetry: poetrys[showIndex]
            }
        }
        ctx.body = returnData;
    }
}

async function drawImg(content) {
    await new Promise((resolve, reject) => {
        gm('./static/img/background1.png')
            .font('./static/fonts/chinese.stxingka.ttf')
            .fontSize(40)
            .drawText(0, 0, content, 'center')
            .write('./static/img/draw.jpg', function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
    });
}