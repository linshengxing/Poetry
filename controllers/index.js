const model = require('../model');
const gm = require('gm');
const send = require('koa-send');
const THEME = require('./theme');

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
        var theme = ctx.request.query['theme'];
        await drawImg(theme, content);
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
        console.log(showIndex);
        let returnData = {
            success: true,
            data: {
                poetry: poetrys[showIndex]
            }
        }
        ctx.body = returnData;
    }
}

async function drawImg(theme, content) {
    var bgcolor = THEME[theme].bgcolor;
    var color = THEME[theme].color;
    var drawText = ('"' + String(content).trim().replace(/"/g, '\\"') + '"');
    await new Promise((resolve, reject) => {
        gm(1920, 1080, bgcolor)
            .fill(color)
            .font('./static/fonts/chinese.stxingka.ttf')
            .fontSize(40)
            .gravity('Center')
            .draw(["rotate 90 text 0,0 " + drawText])
            // .drawText(0, 0, content, 'center')
            .write('./static/img/draw.jpg', function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
    });
}