const {Router} = require('express');
const router = new Router();
const _ = require('underscore');
const mysqlConnection = require("../database");

router.get('/', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM city",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/languageByCountry/:continent', (req,res)=>{ 
    const {continent} = req.params;
    mysqlConnection.query("SELECT countrylanguage. * FROM countrylanguage JOIN country ON country.Code = countrylanguage.CountryCode WHERE country.Continent = ?",[continent],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/CountryOrderByDESC/:continent', (req,res)=>{ 
    const {continent} = req.params;
    mysqlConnection.query("SELECT country.Name, country.Continent, country.Region, country.IndepYear FROM country WHERE country.Continent = ? ORDER BY IndepYear DESC",[continent],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/CountryDistinct/:continent', (req,res)=>{ 
    const {continent} = req.params;
    mysqlConnection.query("SELECT DISTINCT country.Name FROM city JOIN country ON country.Code = city.CountryCode WHERE city.Name LIKE '%"+continent+"%'",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/CountryPupulation/:continent', (req,res)=>{ 
    const {continent} = req.params;
    mysqlConnection.query("SELECT AVG (Population)  FROM country WHERE Continent= ?",[continent],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/CountryMaxPupulation/:continent', (req,res)=>{ 
    const {continent} = req.params;
    mysqlConnection.query("SELECT * FROM city WHERE city.Population =(SELECT max(Population) from city);",[continent],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.post('/',(req,res)=>{
    const {Name,CountryCode,District,Population} = req.body;
    mysqlConnection.query("INSERT INTO city VALUES (NULL,?,?,?,?)",[Name,CountryCode,District,Population],(err,row,filed)=>{
        if(err){
            console.log(err);
        }else{
            res.json({"status":"city inserted"});
        }
    })
});



router.delete('/:id',function(req,res){
    const{id} = req.params;
   mysqlConnection.query("DELATE FROM city WHERE id = ?",[id],(err,row,field)=>{
    if(err){
        console.log(err);
 
    }else{
        res.json({"status":"city deleted"});
    }
    })
});

router.put('/:id',function(req,res){
    const{id} = req.params; 
    const {Name,CountryCode,District,Population} = req.body;
    mysqlConnection.query("UPDATE city SET Name = ?,CountryCode=?,District=?,Population=? WHERE id=?",[Name,CountryCode,District,Population,id],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"city update"});
     }
     })
});

module.exports = router;