const { model } = require('mongoose');
const categoryController = require('../controllers/categories.controller');
const express = require('express');
const router = express.Router();

router.post('/categories', categoryController.create);
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findOne);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

module.exports = router;