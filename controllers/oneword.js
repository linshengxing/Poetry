const https = require('https');

module.exports = {
    'GET /oneword': async(ctx, next) => {
    ctx.render('oneword.html', {
        title: '一句古诗词',
        });
    }
}