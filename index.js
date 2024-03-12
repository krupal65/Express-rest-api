const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {    id:uuidv4(),
        username:"apnacollge",
        content:"I love coding",
    },
    
    {    id:uuidv4(),
        username:"krupal",
        content:"I love coding also",
    } ,
     
    {    id:uuidv4(),//npm install uuid
        username:"raj",
        content:"I love coding also and dsa",
    } ,
];
app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs",{posts});
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    console.log(post);
    res.render("show.ejs",{post});
});
app.post("/posts",(req,res)=>
{ 
    let{username,content}=req.body;
    let id=uuidv4();//new post me id bhi jayegi ab
    posts.push({id,username,content});
    // res.send("post request send");
    res.redirect("/posts");//submit pe click karte he posts vale pe a jayege
});
//to change a data update az dta
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
     let post=posts.find((p)=> id ===p.id);
 post.content=newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts");
});
app.get("/posts/:id/edit" , (req,res)=>
{
    let{ id }=req.params;
    let post=posts.find((p)=> id === p.id);
   // console.log("hi");
    res.render("edit.ejs", {post});
    
});
app.delete("/posts/:id",(req,res)=>
{
    let{id}=req.params;
    posts=posts.filter((p)=>id !==p.id);
    res.redirect("/posts");
})
app.listen(port,()=>
{
    console.log(`listening port on ${port}`);
});