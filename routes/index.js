const express = require('express');
const router = express.Router();
const moment = require('moment')

const uuid = require('uuid');
const admin = require("firebase-admin");
const db = admin.firestore();

const sendEmail = require('./../contact/sendMail')
// Welcome Page
router.get('/', (req, res) => {
    res.redirect('/sliminem/Beats')
});

router.get('/sliminem/:category', async (req, res) => {
    const category = req.params.category
    var videos = []

    if (category === "Beats") {
        const videosCollection = await db.collection('videos').where('category', '==', 'Beats').get()
        if (videosCollection.docs.length > 0) {
            for (const vid of videosCollection.docs) {
                videos.push(vid.data())
            }
        }
    }else if(category === "Music"){
        const videosCollection = await db.collection('videos').where('category', '==', 'Music').get()
        if (videosCollection.docs.length > 0) {
            for (const vid of videosCollection.docs) {
                videos.push(vid.data())
            }
        }
    }else{
        res.redirect('/sliminem/Beats')
    }
    res.render('home', { videos, category })
});


router.get('/addVideo', (req, res) => {
    res.render('addVideo')
})

router.post('/addVideo', async (req, res) => {
    const { category, title, url, price, buyLink } = req.body;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');

    const videosCollection = db.collection('videos');
    await videosCollection.add({
        id: uuid.v4(),
        category,
        title,
        url,
        price,
        buyLink,
        date
    })
    res.redirect('addVideo')
})

router.post('/contact', async (req, res)=>{
    const { name, email, contactNo, message} = req.body
    console.log(req.body)
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const contactsCollection = db.collection('contacts');
    await contactsCollection.add({
        id: uuid.v4(),
        name,
        email,
        contactNo,
        message,
        date
    })
    sendEmail(name, email, contactNo, message);
    req.flash('error_msg','We have recieved your message, will contact you soon.')
    res.redirect('/sliminem/Beats');
})

module.exports = router;
