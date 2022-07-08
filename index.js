const app = require('express')();
const port = process.env.port || 3000;


app.get('/data',(req,res)=>{
    res.status(200).send({
        name:"Kaushik Ghosh",
        College: 'Coochbehar Government Engineering College',
    });
    
    
    })
app.listen(
    port,()=>{
        console.log(`Server running on Port ${port}`);
    }
)

