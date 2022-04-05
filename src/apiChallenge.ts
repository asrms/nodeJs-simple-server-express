import express from 'express';


const app = express();

app.use(express.json());


interface TodoPost {
    name:string,
    id:number,
    complete:boolean
}

type PostInputData = Pick<TodoPost, 'name'>;



const validateInputMiddleware:express.RequestHandler = (req,res,next) => {
    const postData: PostInputData = req.body;

    if(!postData.name){
        return res.status(403).send({error: "name field is required"});
    }

    next();
}


let posts: TodoPost[] = [
    {
    id:0,
    name: 'first todo',
    complete: false
   },
   {
    id:1,
    name: 'second todo',
    complete: false
   },
]



/* app.get('/todos', (req,res) => {


    return res.send(posts)
   });
 */

   app.get('/todos/:id', (req,res) => {

    const id = Number(req.params.id);

    // find torna il primo oggetto che trova
    const task = posts.find((task) => task.id == id);
    if(!task){
        return res.status(404).send({msg:'not found'})
    }
    return res.send(task)
   });


   app.post('/todos/',validateInputMiddleware, (req,res) => {

    const postData: PostInputData = req.body;
 
    const lastPost = posts[posts.length -1];
    const newPost = {
        id: lastPost ? lastPost.id + 1 : 0,
        complete: false,
        name: postData.name,
    };

    posts.push(newPost);
    return res.status(201).send(newPost);
   });
   

   app.post('/todos/:id/complete',validateInputMiddleware, (req,res) => {

    const id = Number(req.params.id);
    const postToPublicIdx = posts.findIndex((post) => post.id == id);
    if(!posts[postToPublicIdx]){
        return res.status(404).send({msg:'not found'})
    }

    if(posts[postToPublicIdx].complete){
        return res.status(409).send({msg:'task already completed'})
    }
    posts[postToPublicIdx].complete = true;
    return res.send(posts[postToPublicIdx])
   });



   app.get('/todos', (req,res) => {

    if(req.query.completed){
        return res.send(posts);
    }

        // filter torna un array di questo oggetto
        let task = posts.filter((task) => !task.complete);

        return res.send(task);

   });


   app.get('*', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata </p>")
});


app.listen(4000, () => {
    console.log("server started at http://localhost:4000")
})