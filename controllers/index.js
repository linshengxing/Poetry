const model = require('../model');
const schedule = require('node-schedule');

// 每次项目启动则重置，用于显示诗文
var showIndex = 0;

// 设置定时器，每隔2小时显示下一首诗词
schedule.scheduleJob('*/2 * * *', function () {
    showIndex++;
});

module.exports = {
    'GET /': async (ctx, next) => {
        let Poetry = model.Poetry;
        await Poetry.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function (poetrys) {
            // 索引超过诗文的总数则重置，再显示诗文
            if (showIndex > poetrys.length) {
                showIndex = 0;
            }
            ctx.render('index.html', {
                title: 'Welcome',
                poetry: poetrys[showIndex]
            });
        });
    }
}