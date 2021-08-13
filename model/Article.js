const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 1
    },
    link:{
        type: String,
        required: true,
        max: 1024,
        min: 1
    }

});

module.exports = mongoose.model('Article', articleSchema);