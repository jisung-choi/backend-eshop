const {Admin} = require('../models/admin');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req,res) => {
    const admin = await Admin.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!admin) {
        return res.status(400).send('The admin not found');
    }

    if(admin && bcrypt.compareSync(req.body.password, admin.passwordHash)) {
        const token = jwt.sign(
            {
                adminId: admin.id,
                isUsersAdmin: admin.isUsersAdmin,
                isProductsAdmin: admin.isProductsAdmin,
                isOrdersAdmin: admin.isOrdersAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({admin: admin.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }
    
})

module.exports =router;