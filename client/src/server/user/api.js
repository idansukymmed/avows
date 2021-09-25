const router = require('express').Router();
const crypto = require('crypto');

const Vonage = require('@vonage/server-sdk');

require('dotenv').config();

var nexAPI = process.env.NEX_API;
var nexSECRET = process.env.NEX_SECRET;
var nexBRAND = process.env.NEX_BRAND;
var nexWORKFLOW = process.env.NEX_WORKFLOW;
var nexLENGTH = process.env.NEX_PINLENGTH;

const nexDemmyKusnadi = new Vonage({
    apiKey: nexAPI,
    apiSecret: nexSECRET
});

const { Invalid } = require('./invalid');
const { User } = require('./model');
const { Token } = require('./token');
const { auth } = require('./middle');

router.route('/auth').get(auth, (req, res) => {
    res.status(200).json({
        success: true,
        isAuth: req.user.isAuth,
        email: req.user.email,
        name: req.user.name,
        nickname: req.user.nickname,
        extension: req.user.extension,
        nationality: req.user.nationality,
        countrycode: req.user.countrycode,
        carrier: req.user.carrier,
        phone: req.user.phone,
        isAuth: req.user.isAuth,
        isFirstTime: req.user.isFirstTime,
        createdAt: req.user.createdAt
    })
})

router.route('/firstupdate').post(auth, (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, userexist) => {
        if (userexist) {
            return res.json({ success: false, message: 'email registered to other account' });
        }
        User.findOneAndUpdate(
            {
                'phone': req.user.phone
            },
            {
                $set: {
                    'name': req.body.name,
                    'email': req.body.email,
                    'nickname': req.body.nickname,
                    'isFirstTime': false
                }
            },
            { new: true },
            (err, doc) => {
                if (err) return res.json({ success: false, err, message: 'TRY AGAIN!!' });
                return res.status(200).json({
                    success: true,
                    userexist: doc
                })
            }
        )
    })

})

router.route('/verifyphone').post((req, res) => {
    let phonenumber = req.body.extension.dialCode + req.body.phone;

    User.findOne(
        { 'phone': req.body.phone }, (err, userexist) => {
            if (userexist) {
                Token.findOne({ 'uid': userexist._id }, (err, tokenexist) => {
                    if (!tokenexist) {
                        nexDemmyKusnadi.verify.request({
                            number: phonenumber,
                            brand: nexBRAND,
                            workflow_id: nexWORKFLOW,
                            code_length: nexLENGTH
                        }, (err, resultid) => {
                            var token = new Token({
                                uid: userexist._id,
                                requestid: resultid.request_id,
                                token: crypto.randomBytes(16).toString('hex')
                            })

                            token.save((err, tokendoc) => {
                                if (err) return res.json({ success: false, err, message: 'failed (REG5), please try again' });
                                return res.status(200).json({
                                    success: true,
                                    doc: userexist,
                                    tokendoc
                                })
                            })
                        });
                    } else {
                        nexDemmyKusnadi.verify.search(tokenexist.requestid, (error, getresult) => {
                            if (error) {
                                return res.json({ success: false, error, message: 'token not valid, please retry!' });
                            } else {
                                if (getresult.status === 'EXPIRED') {
                                    Token.deleteMany({ 'uid': userexist._id }, (err5, deletedtoken) => {
                                        if (err5) return res.json({ success: false, err5, message: 'failed (REG1), please try again' });
                                        nexDemmyKusnadi.verify.request({
                                            number: phonenumber,
                                            brand: nexBRAND,
                                            workflow_id: nexWORKFLOW,
                                            code_length: nexLENGTH
                                        }, (err, resultid) => {
                                            if (err) return res.json({ success: false, err, message: 'failed (REG2), please try again' });
                                            var token = new Token({
                                                uid: userexist._id,
                                                requestid: resultid.request_id,
                                                token: crypto.randomBytes(16).toString('hex')
                                            })

                                            token.save((err, tokendoc) => {
                                                if (err) return res.json({ success: false, err, message: 'failed (REG3), please try again' });
                                                return res.status(200).json({
                                                    success: true,
                                                    doc: userexist,
                                                    tokendoc
                                                })
                                            })
                                        })
                                    })
                                } else {
                                    // console.log('not expired user exist');
                                    return res.status(200).json({
                                        success: true,
                                        doc: userexist,
                                        tokendoc: tokenexist
                                    })
                                }
                            }
                        })
                    }
                })
            } else {
                Invalid.findOne(
                    { 'phone': phonenumber }, (err, invalidnumber) => {
                        if (invalidnumber) return res.json({ success: false, message: 'Invalid phone number' });
                        nexDemmyKusnadi.numberInsight.get(
                            {
                                level: 'advancedSync',
                                number: phonenumber
                            },
                            (error, result) => {
                                if (error) {
                                    return res.json({ success: false, message: 'Save failed (REG3_M), please try again' });
                                } else {
                                    if (result && result.status === 0) {
                                        nexDemmyKusnadi.verify.request({
                                            number: phonenumber,
                                            brand: nexBRAND,
                                            workflow_id: nexWORKFLOW,
                                            code_length: nexLENGTH
                                        }, (err, resultid) => {
                                            if (resultid) {
                                                newuser = new User({
                                                    phone: req.body.phone,
                                                    extension: req.body.extension.dialCode,
                                                    nationality: req.body.extension.name,
                                                    countrycode: req.body.extension.countryCode,
                                                    carrier: result.original_carrier.name
                                                });
                                                newuser.save((err, doc) => {
                                                    if (err) return res.json({ success: false, err, message: 'Save failed (REG1_M), please try again' });
                                                    var token = new Token({
                                                        uid: newuser._id,
                                                        requestid: resultid.request_id,
                                                        token: crypto.randomBytes(16).toString('hex')
                                                    })

                                                    token.save((err, tokendoc) => {
                                                        if (err) return res.json({ success: false, err, message: 'Save failed (REG2_M), please try again' });
                                                        return res.status(200).json({
                                                            success: true,
                                                            doc,
                                                            tokendoc
                                                        })
                                                    })
                                                })
                                            } else {
                                                return res.json({
                                                    success: false,
                                                    message: 'Save failed (REG3_M), please try again'
                                                })
                                            }
                                        });
                                    } else {
                                        var invalidnumber = new Invalid({
                                            phone: phonenumber
                                        })
                                        invalidnumber.save((err, invalidnumberdoc) => {
                                            if (err) return res.json({ success: false, err, message: 'Invalid number not saved' });
                                            return res.json({ success: false, message: 'Invalid phone number' });
                                        })
                                    }
                                }
                            }
                        )
                    })
            }
        }
    )
})

router.route('/confirmpin').post((req, res) => {
    Token.findOne({ 'token': req.query.token }, (err, token) => {
        if (!token) return res.json({ success: false, err, message: 'token expired, Please retry!' });

        User.findOne({ '_id': token.uid }, (err2, currentuser) => {
            if (!currentuser) return res.json({ success: false, err2, message: 'profile not exist, Please retry!' })

            nexDemmyKusnadi.verify.check({
                request_id: req.query.requestid,
                code: req.body.code
            }, (err3, result) => {
                if (result && result.status === '0') {
                    currentuser.isAuth = true;
                    currentuser.save((err4, aftersave) => {
                        if (err) return res.json({ success: false, err4, message: 'network error, Please retry!' });
                        // Token.findByIdAndRemove(token._id, (err5, doc) => {
                        Token.deleteMany({ 'uid': currentuser._id }, (err5, doc) => {
                            if (err) return res.json({ success: false, err5, message: 'token not deleted, Please retry!' });
                            aftersave.generateToken((err6, newuser) => {
                                if (err) return res.json({ success: false, err6, message: 'failed, Please retry!' });
                                var expiryDate = new Date(Number(new Date()) + 17280000000); // 200 days (200 * 24 * 60 * 60 * 1000) milliseconds
                                res.cookie('demmykusnadi_token_auth', newuser.token, { expires: expiryDate, httpOnly: true, sameSite: 'Lax' }).status(200).json({
                                    success: true,
                                    newuser
                                })
                            })
                        })
                    })
                } else if (result && result.status === '16') {
                    return res.json({ success: false, message: 'incorrect pin, please retry!' });

                } else {
                    Token.deleteMany({ 'uid': currentuser._id }, (err7, doc) => {
                        if (err) return res.json({ success: false, err7, message: 'failed (CON4_M), token not deleted' });
                        return res.json({ success: false, message: 'pin expired, please retry!' });
                    })
                }
            });
        })
    })
})

router.route('/logout').get(auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'failed, please retry!' });
            return res.status(200).json({
                success: true
            })
        }
    )
})

// router.route('/adminusers').get((req, res) => {
//     User.
//         find().
//         populate('roles').
//         exec((err, users) => {
//             if (err) return res.json({ success: false, err, message: "GET USERS FAILED" });
//             res.status(200).json({
//                 success: true,
//                 users
//             });
//         })
// })

// router.route('/adminusersbyid').get((req, res) => {
//     let type = req.query.type;
//     let items = req.query.id;

//     if (type === "array") {
//         let ids = req.query.id.split(',');

//         items = [];
//         items = ids.map(item => {
//             return mongoose.Types.ObjectId(item)
//         })
//     }

//     User.
//         find({ '_id': { $in: items } }).
//         populate('roles').
//         exec((err, docs) => {
//             if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
//             res.status(200).json({
//                 success: true,
//                 docs
//             });
//         })
// });

module.exports = router;