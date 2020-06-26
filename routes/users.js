const express = require('express');
const router = express.Router();
const database = require('../includes/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.query("select * from tb_users ORDER BY name", (err, result)=>{
    if(err){
      res.json(err);
    }else{
      res.json(result)
    }
  })
});

module.exports = router;
