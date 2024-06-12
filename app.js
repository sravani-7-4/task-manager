//  jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
 
const date = require(__dirname+"/date.js");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB',{ useNewUrlParser : true});



const itemsSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true 
    },
    dd: {
        type: String,
        required: true
    }
});
const Item = mongoose.model('Item',itemsSchema);


const app = express();


const workitemSchema = new mongoose.Schema({
    name:String,
    dd:String
});
const WorkItem = new mongoose.model("WorkItem",workitemSchema);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

var alert = require('alert');

app.get("/",function(req,res){
    var day  = date.getDate();
   
    Item.find({}).then((foundItems)=>{
        res.render('list',{ ListTitle: day, newItem: foundItems});
    }).catch((err)=>{
        console.log(err);
    });

});

app.post("/",function(req,res){
    console.log("post "+req.body.list);
    let options = { weekday: 'long', day: 'numeric', month: 'long'}; 
    let today = new Date();
    let dp = today.toLocaleDateString("en-US",options) ;

    if (req.body.list=="Work List")
    {
        WorkItem.insertMany({
            name:req.body.name,
            dd:dp
        }).then(function(){
            console.log('Successfully workitem inserted');
        }).catch(function(err){
            console.log(err);
        });
        console.log(dp);
        res.redirect('/work');
    }
    else
    {
        Item.insertMany({
            name:req.body.name,
            dd:dp
        }).then(function(){
            console.log("Successfully item inserted");
        }).catch(function(err){
            console.log(err);
        });
        console.log(dp);
        res.redirect("/");
    }
});



app.get("/work",function(req,res){
    // res.render("list",{ListTitle:"Work List",newItem:workItems});
    WorkItem.find({}).then(function(foundWorkItems){
        res.render("list",{ListTitle:"Work List",newItem:foundWorkItems});
    })
});

app.post("/delete",function(req,res){
    var i=req.body.checkbox;
        Item.deleteOne({_id:i}).then(function(){
            console.log("deleted item ");
        }).catch(function(err){
            console.log(err);
        });
        res.redirect('/');
    console.log(i);
});

app.post("/delete/work",function(req,res){
    var i=req.body.checkbox;
    console.log(i);
    WorkItem.deleteOne({_id:i}).then(function(){
        console.log("deleted work item ");
    }).catch(function(err){
        console.log(err);
    });
    res.redirect('/work');
});


app.listen(1212,function(){
    console.log("server started on 1212 port");
});