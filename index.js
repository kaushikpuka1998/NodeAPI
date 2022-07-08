const app = require('express')();
const port = process.env.port || 3000;

app.listen(
    port,()=>{
        console.log(`Server running on Port ${port}`);
    }
)

app.get('/data',(req,res)=>{
res.status(200).send({
    name:"Kaushik Ghosh",
    College: 'Coochbehar Government Engineering College',
});


})