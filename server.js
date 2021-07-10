const express = require("express");
const app = express();
const server = require("http").Server(app);

//PORT
const port = process.env.PORT || 3000;

//Setting up view engine
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.redirect("/home");
})

app.get("/home", (req, res) => {
    res.render("home");
})

server.listen(port, () => {
    console.log("Server started at port " + port);
})
