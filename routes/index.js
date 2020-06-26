var express = require('express');
var router = express.Router();
const database = require('../includes/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  database.query("SELECT * FROM tb_menus ORDER BY title", (err, result)=>{
    if(err){
      res.status.json(err);
    }else{
      res.render('index', { title: 'Restaurante Saboroso', menus: result, background: 'images/img_bg_1.jpg' });
    }
  });
  
});

router.get('/contacts', (req, res, next)=>{
  res.render('contacts', { title: 'contacts', background: 'images/img_bg_3.jpg', h1: 'Diga um oi' })
})



router.get('/menus', (req, res, next)=>{
  res.render('menus', { title: 'Menus', background: 'images/img_bg_1.jpg', h1: 'Saboreie nosso menu!'})
})


router.get('/reservations', (req, res, next)=>{
  res.render('reservations', { title: 'Reservations', background: 'images/img_bg_2.jpg', h1: 'Reserve uma mesa'})
})


router.get('/services', (req, res, next)=>{
  res.render('services', { title: 'Services', background: 'images/img_5.jpg', h1: 'É um prazer poder servir'})
})

module.exports = router;
