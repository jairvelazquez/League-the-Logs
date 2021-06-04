const express = require('express');
const router = express.Router();
const Users = require('../models/UserModels');

// Home page route.
router.post('/', async function  (req, res) {
    const user = new Users(req.body);
    const savedPost = await user.save();
    res.send(savedPost);
})

// About page route.}
router.get('/', async function (req, res) {
    try{
    const users = await Users.find();
    res.send(users);
    }catch(error){
        res.send(error);
    }
})

router.patch('/forget-password/:myemail', async function(req, res){
    try {
        const updatePass = await Users.updateOne(
            {
                email: req.params.myemail
            },
            {
                $set:{
                    password: req.body.password
                }
            }
        );
        res.send(updatePass);
    } catch (error) {
        res.send(error);
    }
})



module.exports = router;
