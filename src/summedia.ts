import express from 'express';


const app = express();


app.listen(4000, () => {
    console.log("server started at http://localhost:4000")
})

app.get('/stats', (req,res) => {

    const nums: number[] = (req.query.nums as string[]).map((n) => Number(n));

    let sum = 0;


    for(let n of nums ){
        sum += n;
    }
/*     if(nums){
        for(let i = 0; i <= nums.length; i++ ){

            sum = sum + nums[i];
        }
    } */
    console.log(req.url);
    console.log(req.headers);
    res.send(`
    <h1> Benvenuto </h1>
    <p> somma è:  ${sum} </p>
    
    `)

});






app.get('*', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata </p>")
});