
const {Router} = require('express');
const router = new Router();
const _ = require('underscore');
const mysqlConnection = require("../database");

router.get('/', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM products_local",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/product/:barcode', (req,res)=>{
    const {barcode} = req.params; 
    mysqlConnection.query("SELECT * FROM products WHERE barcode= ?",[barcode],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/products', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM products_local JOIN products ON products_local.product = products.barcode",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/search/:text/:start/:end/:idlocal', (req,res)=>{ 
    const {text,start,end,idlocal} = req.params;
    console.log(text);
    
    mysqlConnection.query("SELECT * FROM products JOIN products_local ON products.barcode = products_local.product WHERE (products_local.category= ?  OR name LIKE '%"+text+"%' OR barcode = ?) AND local="+idlocal+"  LIMIT "+start+","+end,[text,text],(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.post('/',(req,res)=>{
    const {stock,ennabled,price_buy,price_sell,price_wholesale,category} = req.body;
        mysqlConnection.query("INSERT INTO products_local VALUES(NULL,?,?,?,?,?,?,'')", [stock,ennabled,price_buy,price_sell,price_wholesale,category], (err, row, fields) => {
            if(err){
                console.log(err);
            }else{
                res.json({"status":"product_local inserted"});
            }
        })
    });

    router.post('/produc',(req,res)=>{
        const {barcode,name,url_image,description} = req.body;
            mysqlConnection.query("INSERT INTO products VALUES(?,?,?,?)", [barcode,name,url_image,description], (err, row, fields) => {
                if(err){
                    console.log(err);
                }else{
                    res.json({"status":"product inserted"});
                }
            })
        });

    router.post('/products',(req,res)=>{
        const {stock,ennabled,price_buy,price_sell,price_wholesale,category,local,barcode,name,url_image,description} = req.body;
     mysqlConnection.query("INSERT INTO products VALUES(?,?,?,?)", [barcode,name,url_image,description], (err, row, fields) => {
            if (err) {
                console.log(err);
            } else {
      mysqlConnection.query("INSERT INTO products_local VALUES(NULL,?,?,?,?,?,?,?,?)", [stock,ennabled,price_buy,price_sell,price_wholesale,category,barcode,local], (err, row, fields) => {
                  if (err) {
                      console.log(err);
                  }else{
                      res.json({"status": "products inserted"});

                  }
              });
            }
        })
    
    });

router.delete('/:idproducts_local',function(req,res){
    const{idproducts_local} = req.params;
    mysqlConnection.query("DELETE FROM products_local WHERE idproducts_local= ?",[idproducts_local],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"Product_local deleted"});
     }
     })
 });

 router.delete('/product/:idproducts_local',function(req,res){
    const{barcode} = req.params;
    mysqlConnection.query("DELETE FROM products WHERE barcode= ?",[barcode],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"Product deleted"});
     }
     })
 });

 router.delete('/products/:idproducts_local',function(req,res){
    const{idproducts_local} = req.params;
    mysqlConnection.query("DELETE products,products_local FROM products JOIN products_local ON products_local.product = products.barcode WHERE idproducts_local= ?",[idproducts_local],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"products deleted"});
     }
     })
 });

 router.put('/products/:idproducts_local',function(req,res){
    const{idproducts_local} = req.params;
    const {stock,ennabled,price_buy,price_sell,price_wholesale,category,local} = req.body;
  mysqlConnection.query("UPDATE products_local SET stock= ?,ennabled= ?,price_buy= ?,price_sell= ?,price_wholesale= ?,category= ?,local= ? WHERE idproducts_local= ?", [stock,ennabled,price_buy,price_sell,price_wholesale,category,local,idproducts_local], (err, row, fields) => {
    if(err){
        console.log(err);
 
    }else{
        res.json({"status":"product_local Update"});
    }
    })
});

module.exports = router;