const express = require("express");
const app = express();
const server = require("http").Server(app);

//PORT
const port = process.env.PORT || 3000;

//Setting up view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//Parsing incoming post data
app.use(express.urlencoded());
app.use(express.json());

//Using for storage of books
let booksCollection = [];

//Home page route
app.get("/", (req, res) => {
    res.redirect("/home");
})

app.get("/home", (req, res) => {
    res.render("home", {
        books: booksCollection
    });
})

//Adding books route
app.get("/add-book", (req, res) => {
    res.render("addBook");
});

app.post("/add-book", (req, res) => {
    let book = {
        name: req.body.book_name,
        year: req.body.year_publish,
        author: req.body.author_name
    }
    console.log(book);
    booksCollection.push(book);
    console.log(booksCollection);
    res.redirect("/home");
})

//Searching Books route

app.post("/searchBooks", (req, res) => {
    var searchName = req.body.bookname;
    res.redirect("/searchBooks/" + searchName);
})

app.get("/searchBooks/:searchName", (req, res) => {
    var name = req.params.searchName;
    let obj = booksCollection.find(o => o.name === name);
    if (obj) {
        res.render('bookFound', {
            name: obj.name,
            year: obj.year,
            author: obj.author
        })
    } else {
        res.redirect("/home")
    }
})



server.listen(port, () => {
    console.log("Server started at port " + port);
})
