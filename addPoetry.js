const model = require('./model');

let Poetry = model.Poetry;
var title = "《浣溪沙》",
    author = "纳兰性德",
    content = "谁念西风独自凉，萧萧黄叶闭疏窗。|沉思往事立残阳，被酒莫惊春睡重。|赌书消得泼茶香，当时只道是寻常。";

    Poetry.create({
    title: title,
    author: author,
    content: content
}).then(function (result) {
    console.log('添加成功！');
});