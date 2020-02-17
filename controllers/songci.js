const fs = require('mz/fs');

module.exports = {
    'GET /songci': async(ctx, next) => {
        var jsonPath = './localdata/songci/ci.song.' + Math.floor(Math.random() * 21) * 1000 + '.json';
        var poetrys = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        var showIndex = Math.floor(Math.random() * poetrys.length);
        ctx.render('songci.html', {
            title: '宋词',
            poetry: poetrys[showIndex],
            total: poetrys.length
        });
    }
}