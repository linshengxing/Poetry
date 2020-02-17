const model = require('../model');
const fs = require('mz/fs');
const path = require('path');
const https = require('https');

module.exports = {

    'GET /nalanxingde': async (ctx, next) => {
        let Poetry = model.Poetry;
        await Poetry.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        }).then(function (poetrys) {
            // 索引超过诗文的总数则重置，再显示诗文
            var showIndex = Math.floor(Math.random() * poetrys.length);

            ctx.render('index.html', {
                title: '纳兰性德',
                poetry: poetrys[showIndex],
                total: poetrys.length
            });
        });
    }
}