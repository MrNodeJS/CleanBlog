const express  = require('express');
const mongoose = require('mongoose');
const ejs      = require('ejs');
const path     = require('path');
const AddPost  = require('./models/Add_post');
const {mongo}  = require("mongoose");


const app = express();

mongoose.connect('mongodb://localhost/cleanblog', {
	useNewUrlParser   : true,
	useUnifiedTopology: true
});

//Template Engine
app.set("view engine", "ejs");


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', async (req, res) => {
	const allpost = await AddPost.find({});
	res.render("index", {
		allpost
	});
});

app.get('/about', (req, res) => {
	res.render("about");
});

app.get('/add_post', (req, res) => {
	res.render("add_post");
});

app.get('/post/:id', async (req, res) => {
	const postDetails = await AddPost.findById(req.params.id);
	res.render("post", {
		postDetails
	});
});

app.post('/add_post', async (req, res) => {
	await AddPost.create(req.body);
	res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
	console.log(`Sunucu ${port} portunda başladı...`);
});