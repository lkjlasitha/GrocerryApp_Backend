const Category = require('../models/categoery.model'); // Correct file import
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCategory(params, callback) {
    console.log('Params received:', params); // Add this line to debug
    if (!params.category_name || !params.category_description) {
        return callback({ status: 400, message: 'Missing required fields' });
    }
    const model = new Category(params);
    model
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((err) => {
            return callback({ status: 500, message: err.message });
        });
}


async function getCategories(params, callback) {
    try {
        const categoryName = params.category_name;
        const condition = categoryName 
            ? { category_name: { $regex: new RegExp(categoryName), $options: 'i' } } 
            : {};

        const perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_LIMIT;
        const page = (Math.abs(params.page) || 1) - 1;

        const data = await Category
            .find(condition, "category_name category_description category_image")
            .limit(perPage)
            .skip(perPage * page);

        const total = await Category.countDocuments(condition);
        
        return callback(null, {
            data: data,
            total: total,
            current_page: page + 1,
            per_page: perPage
        });
    } catch (error) {
        return callback({ status: 500, message: error.message });
    }
}

async function getCategoryByID(params, callback) {
    try {
        const categoryID = params.categoryID;

        if (!categoryID) {
            return callback({ status: 400, message: 'Category ID is required' });
        }

        const data = await Category.findById(categoryID);
        if (!data) {
            return callback({ status: 404, message: `Category not found with ID: ${categoryID}` });
        }

        return callback(null, data);
    } catch (error) {
        return callback({ status: 500, message: error.message });
    }
}

async function updateCategory(params, callback) {
    try {
        const categoryID = params.categoryID;

        if (!categoryID) {
            return callback({ status: 400, message: 'Category ID is required' });
        }

        const data = await Category.findByIdAndUpdate(categoryID, params, { new: true, useFindAndModify: false });

        if (!data) {
            return callback({ status: 404, message: `Category not found with ID: ${categoryID}` });
        }

        return callback(null, { message: 'Category updated successfully', data });
    } catch (error) {
        return callback({ status: 500, message: error.message });
    }
}

async function deleteCategory(params, callback) {
    try {
        const categoryID = params.categoryID;

        if (!categoryID) {
            return callback({ status: 400, message: 'Category ID is required' });
        }

        const data = await Category.findByIdAndDelete(categoryID);
        
        if (!data) {
            return callback({ status: 404, message: `Category not found with ID: ${categoryID}` });
        }

        return callback(null, { message: 'Category deleted successfully' });
    } catch (error) {
        return callback({ status: 500, message: error.message });
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory
};
