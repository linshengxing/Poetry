// const schedule = require('node-schedule');
const https = require('https');

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('oneword.html', {
            title: '一句古诗词',
        });
    }
}