import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 3000;
const posts = [];

app.use(express.static("public"));
app.set("view engine" ,"ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/post/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const post = posts[id];

  if (!post) {
    return res.status(404).send("Post não encontrado");
  }

  res.render("change.ejs", { id, post });
});

app.get("/",(req, res) =>{
    res.render("index.ejs",{
        posts,
    });
})

app.post("/submit",(req, res) =>{
    posts.push({titulo: req.body.titulo,
                texto:req.body.texto});
    res.render("index.ejs",{
        posts,
    });   
})

app.get("/post/:id",(req, res) =>{ 
  const id = req.params.id;
  const post = posts[id];
    if (!post) {
    return res.status(404).send("Post não encontrado");
  }
  res.render("post.ejs",{ post, id});
  })
  
  app.delete("/post/:id",(req, res)=>{
    const id = Number(req.params.id);
    posts.splice(id,1);
    res.redirect("/");
  })
  
  app.put("/post/:id", (req, res) => {
  const id = Number(req.params.id);

  posts[id].texto = req.body.texto;

  res.redirect("/");
  
});

  










app.listen(port, ()=>{
    console.log(`listening to ${port} port`);
})