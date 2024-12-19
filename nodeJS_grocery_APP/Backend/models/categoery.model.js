const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
