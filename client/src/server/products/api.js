const router = require('express').Router();

const { Product } = require('./model');
const { auth } = require('../user/middle');

router.route('/getproducts').get(auth, (req, res) => {

    let findArgs = {};
    let minimum = Number(req.query.min);
    let maximum = Number(req.query.max);

    let order = minimum && maximum ? 'asc' : minimum && !maximum ? 'asc' : !minimum && maximum ? 'desc' : 'desc';
    let sortBy = minimum && maximum ? 'price' : minimum && !maximum ? 'price' : !minimum && maximum ? 'price' : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 4150;
    
    if (req.body.filters && req.body.filters.length > 0) {
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                findArgs[key] = req.body.filters[key]
            }
        }
    } else {
        findArgs = minimum && maximum ? { price: { $gte: minimum, $lte: maximum } } : minimum && !maximum ? { price: { $gte: minimum } } : !minimum && maximum ? { price: { $lte: maximum } } : {}
    }
    
    Product.
        find(findArgs).
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, products) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                products
            });
        })
})

module.exports = router;