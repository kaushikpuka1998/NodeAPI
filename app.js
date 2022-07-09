const app = require('express')();



app.get('/',(req,res)=>{
    res.status(200).send("Kaushik Ghosh"
   );
});

app.listen(
    8080,()=>{
        console.log(`Server running on Port ${8080}`);
    }
)

