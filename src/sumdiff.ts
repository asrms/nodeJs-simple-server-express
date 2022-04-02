import express from 'express';


const app = express();

app.listen(4000, () => {
    console.log("server started at http://localhost:4000")
})





app.get('/sum/:num1/:num2', (req,res) => {
    console.log(req.params);
    console.log(req.url);
    console.log(req.headers)
    const num1: number = Number(req.params.num1);
    const num2: number = Number(req.params.num2);
    const sum = num1 + num2;

    res.send(`<p> ${num1} + ${num2} = ${sum} </p>`)

});


app.get('/diff/:num1/:num2', (req,res) => {
    console.log(req.params);
    console.log(req.url);
    console.log(req.headers)
    const num1: number = Number(req.params.num1);
    const num2: number = Number(req.params.num2);
    const diff = num1 - num2;

    res.send(`<p> ${num1} + ${num2} = ${diff} </p>`)

});








app.get('*', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata </p>")
});
