const express = require('express');
const router = express.Router();
const moment = require('moment')

const uuid = require('uuid');
const admin = require("firebase-admin");
const db = admin.firestore();

// Welcome Page
router.get('/', (req, res) =>{
    res.redirect('/beats')
});

router.get('/beats', (req, res) =>{
    const beats = 'beats'
    res.render('home', {beats})
});

router.get('/music', (req, res) =>{
    const beats = 'music'
    res.render('home', {beats})
});

router.get('/addVideo',(req,res)=>{
    res.render('addVideo')
})

router.post('/addVideo',(req,res)=>{
    const { category, title, url, price, buyLink} = req.body;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(date)
    console.log(req.body)

    res.redirect('addVideo')
})

 
module.exports = router;
