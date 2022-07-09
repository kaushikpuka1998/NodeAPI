const app = require('express')();
const mysql = require('mysql');
require ('dotenv').config();


const db = mysql.createConnection({
    host:  `${process.env.MYSQL_HOST}`,
    port: `${process.env.port}`,
    user : `${process.env.user}`,
    password : `${process.env.password}`,
    database : `${process.env.database}`,

})


db.connect(err=>{
    if(err)
    {
        console.log("DB Connection Failed error=>"+err.message);
        return;
    }
    else{

        console.log("DATABASE SUCCESSFULLY Connected");
        app.get('/',(req,res)=>{
            res.status(200).send({
                     "success":true,
                     "message" :"DB Successfully Connected"
                });
        });
    }
})


app.get('/data',(req,res)=>{
    res.status(200).send({
             "name":"Kaushik Ghosh",
             "College":"Coochbehar Government Engineering College"
        });
});

app.listen(
    8080,()=>{
        console.log(`Server running on Port ${8080}`);
    }
)

