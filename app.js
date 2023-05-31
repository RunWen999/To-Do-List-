const express = require("express");
const bodyParse = require("body-parser");
const app = express();
app.use(bodyParse.urlencoded({extended:true}));
var newItems = [];
var workItems=[];
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newItems:newItems});
});

app.post("/", function(req,res){
    console.log(req.body);
    var newItem = req.body.todo;
    if(req.body.button === "Work List"){
        workItems.push(newItem);
        res.redirect("/work");
    } else{
        newItems.push(newItem);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newItems: workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res) {
    res.render("about");
})


app.listen(3000, function () {
  console.log("working");
});

