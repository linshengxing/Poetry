const model = require('../model');

module.exports = {
    'GET /addPoetry': async (ctx, next) => {
        ctx.render('addpoetry.html', {
            title: 'addpoetry'
        });
    },
    'POST /addpoetry': async (ctx, next) => {
        let Poetry = model.Poetry;
        var 
            title = ctx.request.body.title || '',
            author = ctx.request.body.author || '',
            content = ctx.request.body.content || '',
            message;
        title = '《' + title + '》';
        await Poetry.findAll({
            where: {
                title: title,
                author: author,
                content: content
            }
        }).then(function (poetrys) {
            if (poetrys.length > 0) {
                message = '已存在该诗词，您可以继续添加其他诗词！';
                ctx.render('addpoetryresult.html', {
                    title: 'result',
                    message: message,
                });
            } else {
                Poetry.create({
                    title: title,
                    author: author,
                    content: content
                }).then(result => {
                    if (result.id != '' && result.id != undefined) {
                        message = '成功添加诗词，感谢您的贡献！';
                    } else {
                        message = '添加新诗词出错了。。。';
                    }
                    ctx.render('addpoetryresult.html', {
                        title: 'result',
                        message: message,
                    });
                });
            }
            // ctx.response.body = message;
            // ctx.response.type = 'text/html';
        });
    }
}