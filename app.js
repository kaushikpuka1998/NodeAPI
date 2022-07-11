const app = require('express')();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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



///////////////////////// DATA API //////////////////////////
app.get('/data',auth,(req,res)=>{
    res.json({
             "name":"Kaushik Ghosh",
             "College":"Coochbehar Government Engineering College",
                "userInfo" : req.user
        });
});





///////////////////////// LOGIN API //////////////////////////
app.post('/login' , (req,res)=>{

    try{
        const value= {
            email:req.body.email,
            pass: req.body.password,
        }
        pass = value.pass;
        let sql = 'Select * from allusersignup where email = ?';
        db.query(sql, [value.email],async (err,result)=>{
            if(err)
            {
                res.send({  
                    "result": false,
                    "error":err,
                    "data": []  
                })
            }else
            {   
            {
                var fg = JSON.parse(JSON.stringify(result[0]))
                //console.log(fg.password);
                const cmp = await bcrypt.compare(pass,fg.password)

                if(cmp)
                {
                      if(token == undefined)
                        {
                            token = jwt.sign({value},process.env.accesstoken);
                            res.send({  
                                "result": true,
                                message:"Logged In Successfully",
                                accesstoken: token,
                                "data": JSON.parse(JSON.stringify(result))  
                            })
                            
                        }else{
                        res.status(200).send(
                        {
                            result: true,
                            message:"Already LoggedIn",
                            accesstoken: token
                        });
                    }
                    
                }
                else{
                    res.send({  
                        "result": false,
                        accesstoken: "",
                        "data": []
                    })
                }
            } 
            }
            
           //console.log("retrived Data:",result);
           res.end();
        })
    }
    catch(ex)
    {
        console.log("Error ========>"+ex);
    }
});












///////////////////////// EMAIL-ID CHECK API //////////////////////////
app.post('/emailcheck' , (req,res)=>{

    try{
        const value= {
            email:req.body.email,
        }
        pass = value.pass;
        let sql = 'Select * from allusersignup where email = ?';
        db.query(sql, [value.email],async (err,result)=>{
            if(err)
            {
                res.send({  
                    "result": false,
                    "error":err,
                    "data": []  
                })
            }else
            {   
            {
                if(result.length>0)
                {
                    res.status(200).send(
                        {
                            success:false,
                            message:"Already Email ID in use",
                        });
                }
                else{
                    res.status(200).send(
                        {
                            success:true,
                            message:"Email ID Available",
                        });
                }
            } 
            }
            
           //console.log("retrived Data:",result);
           res.end();
        })
    }
    catch(ex)
    {
        console.log("Error ========>"+ex);
    }
});





///////////////////////// LOGOUT API //////////////////////////
app.post('/logout',(req,res)=>{
   
    var successvalue,msg;
    if(token !== undefined)
    {
        token = undefined;
        successvalue = true;
        msg = "Logged Out Successfully"
    } 
    else{
        successvalue = false;
        msg = "Already Logged Out"
    }

    res.status(200).send(
        {
            success:successvalue,
            message:msg,});
    
    
});





///////////////////////// MIDDLEWIRE //////////////////////////
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



///////////////////////// VIDEO INSERT API //////////////////////////
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






///////////////////////// SIGNUP API //////////////////////////
app.post('/signup',async (req,res)=>{


    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let hash = await bcrypt.hash(password,10);
    let phone = req.body.phone;

    let sql = "INSERT INTO allusersignup(name,email,password,phone) values (?,?,?,?)";

    db.query(sql,[name,email,hash,phone],(err,result)=>{
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
            "message" :"Signed Up Successfully Successfully",
            "data":{"name": name,"email":email,"phone": phone,"hash":hash}
       });

       console.log(req.body);
        res.end();
    })


    
})



///////////////////////// ALL VIDEO DATA API //////////////////////////

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

