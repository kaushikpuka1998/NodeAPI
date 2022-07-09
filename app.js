const app = require('express')();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
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

app.post('/insertdata',(req,res)=>{


    let name = req.body.name;
    let videolink = req.body.videolink;

    let sql = "INSERT INTO nodevideodata(name,videolink) values (?,?)";

    db.query(sql,[name,videolink],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.status(200).send({
            "success":true,
            "message" :"Data Inserted Successfully",
            "data":{"name": name,"videolink": videolink}
       });

       console.log(req.body);
        res.end();
    })


    
})

app.listen(
    8080,()=>{
        console.log(`Server running on Port ${8080}`);
    }
)

