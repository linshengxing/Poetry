const db = require('../db');

module.exports = db.defineModel('poetrys', {
    title: {
        type: db.STRING(100), 
        unique: true
    },
    author: db.STRING(100),
    content: db.STRING(255),
});