const Category = require('../models/category.model');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    return res.status(200).json({
        sucess: category ? true : false,
        data: category 
    })

});

const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find().select('_id title');
    return res.status(200).json({
        success: category ? true : false,
        data: category 
    })

});

module.exports = {
    createCategory,
    getCategory
}