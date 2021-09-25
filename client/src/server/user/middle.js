const { User } = require('./model');

let auth = (req, res, next) => {

    let token = req.cookies.demmykusnadi_token_auth;
    
    User.
        find({ 'token': token }).
        exec((err, user) => {
            if (err) throw err;
            if (user.length < 1) return res.json({
                isAuth: false,
                error: true
            });

            req.token = user[0].token;
            req.user = user[0];
            next();
        })
}

module.exports = { auth }