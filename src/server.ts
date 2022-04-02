import express from 'express';


const app = express();


// '/?firstname=marco&lastname=salvatori'

let count = 0;

app.get('/', (req,res) => {


    const minus = Number(req.query.minus);

    if(Number.isInteger(minus)){
        count = count - minus;
    }else {

        count += 1;
    }
    console.log(req.url);
    console.log(req.headers);
    res.send(`
    <h1> Benvenuto </h1>
    <p> numero di accessi ${count} </p>
    
    `)

});

app.get('/ciao', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.send("<h1> Ciao </h1>")

});

app.get('/greeting/:name', (req,res) => {
    console.log(req.params);
    console.log(req.url);
    console.log(req.headers)
    const name: string = req.params.name

    res.send(`<h1> Ciao ${name} </h1>`)

});

app.get('*', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata </p>")
});

app.listen(4000, () => {
    console.log("server started at http://localhost:4000")
})