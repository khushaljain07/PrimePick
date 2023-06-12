const express = require('express');
const { check,body} = require('express-validator');
const router=express.Router();
const User=require('../model/user');

const authController=require('../controller/auth');
const { MinKey } = require('mongodb');
router.get('/login',authController.getLogin)
router.get('/signup',authController.getSignup)
router.get('/reset',authController.getReset)
router.get('/reset/:token',authController.getNewPassword)
router.post('/login',[
    body('email','please enter correct email or password').isEmail().normalizeEmail(),
    body('password','please enter correct email or password').isLength({min:5}).isAlphanumeric().trim()
],authController.postLogin)
router.post('/signup',[
    check('email').isEmail().withMessage('please enter valid email').custom((value,{req})=>{
       return  User.findOne({email:value}).then(user=>{
        if(user){
            return Promise.reject('User already exist')
        }
         })
    }).normalizeEmail(),
    check('password','please enter correct password').isAlphanumeric().isLength({min:5}).trim(),
    check('confirmPassword','please enter correct password').trim().custom((value,{req})=>{
        if(value!==req.body.password)
        throw new Error ('password has to match')
        return true;
    })

],authController.postSignup)
router.post('/logout',authController.postLogout)
router.post('/reset',authController.postReset)
router.post('/newPassword',authController.postNewPassword)
module.exports=router;  