const app = require('express')();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyparser.json());
require ('dotenv').config();


const db = mysql.createConnection({
    host:  `${process.env.MYSQL_HOST}`,
    port: `${process.env.port}`,
    user : `${process.env.user}`,
    password : `${process.env.password}`,
    database : `${process.env.database}`,

})

var token;
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


app.get('/data',auth,(req,res)=>{
    res.json({
             "name":"Kaushik Ghosh",
             "College":"Coochbehar Government Engineering College"
        });
});

app.post('/login',(req,res)=>{
   
    const value= {
        email:req.body.name,
        password:req.body.password,
    }

    token = jwt.sign({value},process.env.accesstoken);
    res.status(200).send(
        {
            message:"Logged In Successfully",
            accesstoken: token});

            console.log(token);

});

function auth(req,res,next)
{
    if(token !== undefined)
    {

        jwt.verify(token,process.env.accesstoken,(err,verified)=>{
            if(err)
            {
                return res.status(404).send("Invalid Token");
            }
            req.user = verified;
            next();
        })
       
    }
    else{
        res.status(404).send(
            {
                success: false,
                message:"Login Required"
            }
        )
    }
}

app.post('/insertdata',(req,res)=>{


    let name = req.body.name;
    let videolink = req.body.videolink;

    let sql = "INSERT INTO nodevideodata(name,videolink) values (?,?)";

    db.query(sql,[name,videolink],(err,result)=>{
        if(err)
        {
            res.send({  
                "success": false,
                "error":err,
                "data": []  
            })
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


app.get('/alldata',auth,(req,res)=>{


    let name = req.body.name;
    let videolink = req.body.videolink;

    let sql = "SELECT * from nodevideodata";

    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send({  
                "result": false,
                "error":err,
                "data": []  
            })
        }else
        {
            res.send({  
                "result": true,
                "data": JSON.parse(JSON.stringify(result))  
            })
        }
        
       console.log("retrived Data:",result);
       res.end();
    })


    
})

app.listen(
    8080,()=>{
        console.log(`Server running on Port ${8080}`);
    }
)

