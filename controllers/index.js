const model = require('../model');
const fs = require('mz/fs');
const path = require('path');
const schedule = require('node-schedule');

// 每次项目启动则重置，用于显示诗文
var showIndex = 0;

var nipponcolor_data;

// 设置定时器，每天凌晨更新诗词
schedule.scheduleJob('0 0 0 * * *', function () {
    showIndex++;
});

module.exports = {
    'GET /': async (ctx, next) => {
        let Poetry = model.Poetry;
        await Poetry.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        }).then(function (poetrys) {
            // 索引超过诗文的总数则重置，再显示诗文
            if (showIndex >= poetrys.length) {
                showIndex = 0;
            }
            ctx.render('index.html', {
                title: '每日古诗词',
                poetry: poetrys[showIndex],
                total: poetrys.length
            });
        });
    },
    'GET /nipponcolor': async (ctx, next) => {
        let fp = path.resolve(__dirname, '../localdata/nipponcolor.json');
        fs.readFile(fp, 'utf8', function (err, data) {
            if (err) console.log(err);
            nipponcolor_data = data;
        });
        ctx.res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        ctx.res.end(JSON.stringify(nipponcolor_data));
    }
}