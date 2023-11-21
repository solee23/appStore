const express = require('express');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route')

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
}
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;