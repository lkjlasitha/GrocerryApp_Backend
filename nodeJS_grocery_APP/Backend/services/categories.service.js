const { response } = require('express');
const {category} = require('../models/categoery.model');
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCategory(params, callback) {
    if(!params.category_name || !params.category_description || !params.category_image) {
        return callback({status: 400, message: 'Missing required fields'});
    }

    const model = new category(params);
    model
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((err) => {
            return callback({status: 500, message: err.message});
        });
}

async function getCategories(params, callback) {
    const categoryName = params.category_name;
    var condition = categoryName ?
    {
        category_name: { $regex: new RegExp(categoryName), $options: 'i' }
    }
    : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_LIMIT;
    let page = (Math.abs(params.page) || 1) - 1;

    category
    .find(condition, "category_name category_description category_image")
    .limit(perPage)
    .skip(perPage * page)
    .then((data) => {
        category.countDocuments(condition, function(err, count) {
            return callback(null, {
                data: data,
                total: count,
                current_page: page + 1,
                per_page: perPage,
            }).catch((err) => {
                return callback({status: 500, message: err.message});
            });
        });
    })

}

async function getCategoryByID(params, callback) {
    const categoryID = params.categoryID;

    category
    .findById(categoryID)
    .then((data) => {
        if(!data) {
            return callback({status: 404, message: 'Category not found with ID: ' + categoryID});
        } else {
            return callback(null, data);
        }
    })
    .catch((err) => {
        return callback({status: 500, message: err.message});
    });
    
}

async function updateCategory(params, callback) {
    const categoryID = params.categoryID;

    category
    .findByIdAndUpdate(categoryID, params, {useFindAndModify: false})
    .then((data) => {
        if(!data) {
            return callback({status: 404, message: 'Category not found with ID: ' + categoryID});
        } else {
            return callback(null, {message: 'Category updated successfully'});
        }
    })
    .catch((err) => {
        return callback({status: 500, message: err.message});
    });
}

async function deleteCategory(params, callback) {
    const categoryID = params.categoryID;

    category
    .findByIdAndDelete(categoryID)
    .then((data) => {
        if(!data) {
            return callback({status: 404, message: 'Category not found with ID: ' + categoryID});
        } else {
            return callback(null, {message: 'Category deleted successfully'});
        }
    })
    .catch((err) => {
        return callback({status: 500, message: err.message});
    });
}