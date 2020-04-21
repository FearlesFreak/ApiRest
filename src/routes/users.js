
const {Router} = require('express');
const router = new Router();
const _ = require('underscore');
const mysqlConnection = require("../database");

router.get('/', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM users",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/clients', (req,res)=>{ 
    mysqlConnection.query("SELECT * FROM users JOIN clients ON users.delivery = clients.idclient",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.get('/deliveries', (req,res)=>{ 
    mysqlConnection.query("SELECT *  FROM users JOIN deliveries ON users.delivery = deliveries.idsellers",(err,rows,fields)=>{
        if(err){
            console.log("Error : ", err);
        }else{
            res.json(rows);
        }
    })
});

router.post('/',(req,res)=>{
    const {username,email,password,names,lastnames,phone,photo,role} = req.body;
        mysqlConnection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,?,NULL,NULL)", [username,email,password,names,lastnames,phone,photo,role], (err, row, fields) => {
            if(err){
                console.log(err);
            }else{
                res.json({"status":"user inserted"});
            }
        })
    });

router.post('/clients',(req,res)=>{
    const {username,email,password,names,lastnames,phone,photo,url_identification,region,birthday} = req.body;
 mysqlConnection.query("INSERT INTO clients VALUES(NULL,?,?,?)", [url_identification, region, birthday], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
  mysqlConnection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,'client',?,NULL)", [username,email,password,names,lastnames,phone,photo,row.insertId], (err, row, fields) => {
              if (err) {
                  console.log(err);
              }else{
                  res.json({"status": "client inserted"});

              }
          });
        }
    })

});

router.post('/deliveries',(req,res)=>{
    const {username,email,password,names,lastnames,phone,photo,url_identification,url_licence,balance,total_orders} = req.body;
 mysqlConnection.query("INSERT INTO deliveries VALUES(NULL,?,?,?,?)", [url_identification,url_licence,balance,total_orders], (err, row, fields) => {
        if (err) {
            console.log(err);
        } else {
  mysqlConnection.query("INSERT INTO users VALUES(NULL,?,?,?,?,?,NOW(),?,?,'delivery',NULL,?)", [username,email,password,names,lastnames,phone,photo,row.insertId], (err, row, fields) => {
              if (err) {
                  console.log(err);
              }else{
                  res.json({"status": "deliveri inserted"});

              }
          });
        }
    })

});

router.delete('/users/:iduser',function(req,res){
    const{idclient} = req.params;
    mysqlConnection.query("DELETE * FROM users WHERE idclient = ?",[idclient],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"client deleted"});
     }
     })
 });

 router.delete('/clients/:idclient',function(req,res){
    const{idclient} = req.params;
    mysqlConnection.query("DELETE clients,users FROM clients JOIN users ON clients.idclient = users.client WHERE idclient = ?",[idclient],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"client deleted"});
     }
     })
 });

 router.delete('/deliveries/:idsellers',function(req,res){
    const{idsellers} = req.params;
    mysqlConnection.query("DELETE deliveries,users FROM deliveries JOIN users ON deliveries.idsellers = users.delivery WHERE idsellers = ?",[idsellers],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"seller deleted"});
     }
     })
 });

 router.put('/users/:iduser',function(req,res){
    const{iduser} = req.params; 
    const {username,email,password,names,lastnames,phone,photo,role} = req.body;
    mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ?,role= ? WHERE iduser=?",[username,email,password,names,lastnames,phone,photo,role,iduser],(err,row,field)=>{
     if(err){
         console.log(err);
  
     }else{
         res.json({"status":"local update"});
     }
     })
});

router.put('/clients/:idclient',function(req,res){
    const{idclient} = req.params; 
    const {username,email,password,names,lastnames,phone,photo,url_identification,birthday} = req.body;
    mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ? WHERE client=?",[username,email,password,names,lastnames,phone,photo,idclient],(err,row,field)=>{
        if (err) {
            console.log(err);
        } else {
  mysqlConnection.query("UPDATE clients SET url_identification= ?,birthday=? WHERE idclient= ?", [url_identification,birthday,row.insertId], (err, row, fields) => {
              if (err) {
                  console.log(err);
              }else{
                  res.json({"status": "client Update"});

                }
            });
          }
      })
  
  });

  router.put('/deliveries/:idsellers',function(req,res){
    const{idsellers} = req.params;
    const {username,email,password,names,lastnames,phone,photo,url_identification,url_licence,balance,total_orders} = req.body;
    mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ? WHERE delivery=?",[username,email,password,names,lastnames,phone,photo,idsellers],(err,row,field)=>{
        if (err) {
            console.log(err);
        } else {
  mysqlConnection.query("UPDATE deliveries SET url_identification= ?,url_licence= ?,balance= ?,total_orders= ? WHERE idsellers= ?", [url_identification,url_licence,balance,total_orders,row.insertId], (err, row, fields) => {
              if (err) {
                  console.log(err);
              }else{
                  res.json({"status": "delivery Update"});

                }
            });
          }
      })
  
  });



module.exports = router;