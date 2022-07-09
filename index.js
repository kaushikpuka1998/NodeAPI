const app = require('express')();
const port = process.env.port || 3000;


app.get('/',(req,res)=>{
    res.status(200).send("Kaushik Ghosh",
   );
});


app.listen(
    port,()=>{
        console.log(`Server running on Port ${port}`);
    }
)

