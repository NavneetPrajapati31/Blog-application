const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Navneet",
    content: "I love coding",
  },

  {
    id: uuidv4(),
    username: "Shradha",
    content: "Hardwork beats Talent",
  },

  {
    id: uuidv4(),
    username: "Rahul",
    content: "Hey there",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ username, content, id: uuidv4() });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("listening to port : 8080");
});
