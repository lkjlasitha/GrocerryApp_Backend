const categoriesServices = require('../services/categories.service');
const upload = require('../middleware/category.uploade');

exports.create = (req, res, next) => {
    upload(req, res, function(err) {
        if(err){
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : null;
            var model = {
                categoryName : req.body.categoryName,
                categoryDescription : req.body.categoryDescription,
                categoryImage : path != "" ? "/" + path : "",
            };

            categoriesServices.createCategory(model, (err, data) => {
                if(err) {
                  return next(err);
                } else {
                   return res.status(200).send({
                    message: 'Category created successfully',
                    data: data
                   })
                }
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        categoryName: req.query.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };

    categoriesServices.getCategories(model, (err, results) => {
        if (err) {
            return next(err);
        } else {
            return res.status(200).send({
                message: 'Categories retrieved successfully',
                data: results
            });
        }
    })
};

exports.findOne = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    };

    categoriesServices.getCategoryById(model, (err, results) => {
        if (err) {
            return next(err);
        } else {
            return res.status(200).send({
                message: 'Categories retrieved successfully',
                data: results
            });
        }
    })
};

exports.update = (req, res, next) => {
    upload(req, res, function(err) {
        if(err){
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : null;
            var model = {
                categoryId: req.params.id,
                categoryName : req.body.categoryName,
                categoryDescription : req.body.categoryDescription,
                categoryImage : path != "" ? "/" + path : "",
            };

            categoriesServices.updateCategory(model, (err, data) => {
                if(err) {
                  return next(err);
                } else {
                   return res.status(200).send({
                    message: 'Category Updated successfully',
                    data: data
                   })
                }
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    };

    categoriesServices.deleteCategory(model, (err, results) => {
        if (err) {
            return next(err);
        } else {
            return res.status(200).send({
                message: 'Category deleted successfully',
                data: results
            });
        }
    })
};
