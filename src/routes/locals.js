
const {Router} = require('express');
const router = new Router();
const _ = require('underscore');
const mysqlConnection = require("../database");

router.get('/', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM locals",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});



router.post('/',(req,res)=>{
    const {name,description,url_image,category} = req.body;
    mysqlConnection.query("INSERT INTO locals VALUES (NULL,?,?,?,?)",[name,description,url_image,category],(err,row,filed)=>{
        if(err){
            console.log(err);
        }else{
            res.json({"status":"local inserted"});
        }
    })
});

router.delete('/:idlocal',function(req,res){
    const{idlocal} = req.params;
   mysqlConnection.query("DELETE FROM locals WHERE idlocal = ?",[idlocal],(err,row,field)=>{
    if(err){
        console.log(err);
 
    }else{
        res.json({"status":"local deleted"});
    }
    })
});

router.put('/:idlocal',function(req,res){
    const{idlocal} = req.params; 
    const {name,description,url_image,category} = req.body;
    mysqlConnection.query("UPDATE locals SET name=?,description=?,url_image=?,category=? WHERE idlocal=?",[name,description,url_image,category,idlocal],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"local update"});
     }
     })
});

module.exports = router;