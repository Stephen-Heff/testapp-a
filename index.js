//import required modules
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//Mongo stuff
const dbUrl = "mongodb://127.0.0.1:27017/smoothiedb";
const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8000;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//In order to parse POST body data as JSON, do the following.
//The following lines will convert the form data from query
//string format to JSON format.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* var links  = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  }
];*/
//test Express app
app.get("/", async (request, response) => {
  //response.status(200).send("Test page again");
  links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
  links = await getLinks();
  response.render("about", { title: "About", menu: links });
});
app.get("/admin/menu", async (request, response) => {
  links = await getLinks();
  response.render("menu-list", { title: "Menu links admin", menu: links });
});



//FORM PROCESSING PATHS

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


//MONGO FUNCTIONS
async function connection() {
  await client.connect();
  db = client.db("smoothiedb"); //select smoothiedb database
  return db;
}
/* Async function to retrieve all links documents from smoothies collection. */
async function getLinks() {
  db = await connection(); //await result of connection() and store the returned db
  var results = db.collection("smoothies").find({}); //{} as the query means no filter, so select all
  res = await results.toArray();
  return res;
}

