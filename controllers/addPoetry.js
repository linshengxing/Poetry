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
            content = ctx.request.body.content || '';
        title = '《' + title + '》';
        await Poetry.create({
            title: title,
            author: author,
            content: content
        }).then(function (result) {
            // console.log('添加成功！');
        });
    }
}