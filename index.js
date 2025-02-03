import express from "express";

const app = express();

const PORT = 5111;

app.all('/', (req, res)=>{
    console.log("Response > ", req);
    console.log("Request > ", res);

    res.send(`I'm up!`);

})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});