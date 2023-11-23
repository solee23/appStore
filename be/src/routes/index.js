const express = require('express');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const blogCategoryRoute = require('./blogCategory.route');
const blogRoute = require('./blog.route');
const brandRoute = require('./brand.route');
const coupondRoute = require('./coupon.route');

const router = express.Router();

const defaultRoutes = [{
    path: '/user',
    route: userRoute
},
{
    path: '/product',
    route: productRoute
},
{
    path: '/category',
    route: categoryRoute
},
{
    path: '/blogcategory',
    route: blogCategoryRoute
},
{
    path: '/blog',
    route: blogRoute
},
{
    path: '/brand',
    route: brandRoute
},
{
    path: '/coupon',
    route: coupondRoute
},

];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;