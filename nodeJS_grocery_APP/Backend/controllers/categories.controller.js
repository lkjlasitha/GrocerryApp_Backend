const categoriesServices = require('../services/categories.service');
const upload = require('../middleware/category.uploade');

const handleFileUpload = (req) => {
    if (!req.file) return null;
    return req.file.path.replace(/\\/g, "/");
};

exports.create = (req, res, next) => {
    upload(req, res, function(err) {
        if(err) return next(err);
        
        const path = handleFileUpload(req);
        var model = {
            category_name: req.body.category_name,
            category_description: req.body.category_description,
            category_image: path ? "/" + path : "",
        };

        categoriesServices.createCategory(model, (err, data) => {
            if(err) return next(err);
            return res.status(200).send({ message: 'Category created successfully', data });
        });
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        category_name: req.query.category_name,
        pageSize: parseInt(req.query.pageSize) || 10,
        page: parseInt(req.query.page) || 1,
    };

    categoriesServices.getCategories(model, (err, results) => {
        if (err) return next(err);
        return res.status(200).send({ message: 'Categories retrieved successfully', data: results });
    });
};

exports.findOne = (req, res, next) => {
    var model = { categoryID: req.params.id };

    categoriesServices.getCategoryByID(model, (err, results) => {
        if (err) return next(err);
        return res.status(200).send({ message: 'Category retrieved successfully', data: results });
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function(err) {
        if(err) return next(err);

        const path = handleFileUpload(req);
        var model = {
            categoryID: req.params.id,
            category_name: req.body.category_name,
            category_description: req.body.category_description,
            category_image: path ? "/" + path : "",
        };

        categoriesServices.updateCategory(model, (err, data) => {
            if(err) return next(err);
            return res.status(200).send({ message: 'Category updated successfully', data });
        });
    });
};

exports.delete = (req, res, next) => {
    var model = { categoryID: req.params.id };
    categoriesServices.deleteCategory(model, (err, results) => {
        if (err) return next(err);
        return res.status(200).send({ message: 'Category deleted successfully', data: results });
    });
};
