const mongoose = require('mongoose');
const category = mongoose.model(
    'category',
    mongoose.Schema({
        category_name: {
            type: String,
            required: true,
            unique: true,
        },
        category_description: {
            type: String,
            required: true,
        },
        category_image: {
            type: String,
            required: true,
        },
    }),
);

module.exports = category;