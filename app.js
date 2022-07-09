const app = require('express')();



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

