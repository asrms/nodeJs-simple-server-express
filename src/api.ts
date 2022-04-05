import express from 'express';


const app = express();

app.use(express.json());

interface BlogPost {
    title:string,
    date:Date,
    body:string;
    id:number,
    draft:boolean
}

type PostInputData = Pick<BlogPost, 'title' | 'body'>;



const validateInputMiddleware:express.RequestHandler = (req,res,next) => {
    const postData: PostInputData = req.body;

    if(!postData.title){
        return res.status(403).send({error: "title field is required"});
    }

    if(!postData.body){
        return res.status(403).send({error: "body field is required"});
    }

    next();
}


let posts: BlogPost[] = [
    {
    id:0,
    title: 'first post',
    date: new Date(),
    body: 'ciao',
    draft: false
   },
   {
    id:1,
    title: 'second post',
    date: new Date(),
    body: 'ciao 2',
    draft: false
   },
]

let cnt = 0;

app.get('/', (req,res) => {

    cnt += 1;

    res.send({
        hello: 'world',
        cnt: cnt});

});

app.get('/posts/', (req,res) => {


 return res.send(posts)
});

app.get('/posts:id', (req,res) => {

    const id = Number(req.params.id);

    const post = posts.find((post) => post.id == id);
    if(!post){
        return res.status(404).send({msg:'not found'})
    }
    return res.send(post)
   });

   app.post('/posts:id/public', (req,res) => {

    const id = Number(req.params.id);
    const postToPublicIdx = posts.findIndex((post) => post.id == id);
    if(!posts[postToPublicIdx]){
        return res.status(404).send({msg:'not found'})
    }
    posts[postToPublicIdx].draft = true;
    return res.send(posts[postToPublicIdx])
   });

   app.put('/posts/:id',validateInputMiddleware, (req,res) => {

    const id = Number(req.params.id);
    const postData: PostInputData = req.body;

    const postToUpdateIndex = posts.findIndex((post) => post.id == id);
    if(!posts[postToUpdateIndex]){
        return res.status(404).send({msg:'not found'})
    }

    posts[postToUpdateIndex] = {
        ...posts[postToUpdateIndex],
        title: postData.title,
        body: postData.body,
    }

    return res.send(posts[postToUpdateIndex])
   });


   app.delete('/posts/:id', (req,res) =>{

    const id = Number(req.params.id);

    const postToDelete = posts.find((post) => post.id == id);
    if(!postToDelete){
        return res.status(404).send({msg:'not found'})
    }

    posts = posts.filter((post) => post.id != postToDelete.id);
    return res.send(postToDelete);

   });

   app.post('/posts/',validateInputMiddleware, (req,res) => {

    const postData: PostInputData = req.body;
 
    const lastPost = posts[posts.length -1];
    const newPost = {
        id: lastPost ? lastPost.id + 1 : 0,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body,
    };

    posts.push(newPost);
    return res.status(201).send(newPost);
   });
   
   




app.post('/reply', (req,res) => {

    const body = req.body;
    console.log(body);

    res.send({body});

});


app.post('/reply', (req,res) => {



    const body = req.body;
    console.log(body);

    res.send({body});

});


app.get('*', (req,res) => {

    console.log(req.url);
    console.log(req.headers);
    res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata </p>")
});


app.listen(4000, () => {
    console.log("server started at http://localhost:4000")
})