const express      = require('express');
var methodOverride = require('method-override');
const mongoose     = require('mongoose');
const ejs          = require('ejs');
const path         = require('path');
const Posts        = require('./models/Add_post');
const {mongo}      = require("mongoose");


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
app.use(methodOverride('_method', {
	methods: ['POST', 'GET'],
}));

app.get('/', async (req, res) => {
	const allpost = await Posts.find({});
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
	const postDetails = await Posts.findById(req.params.id);
	res.render("post", {
		postDetails
	});
});

app.post('/add_post', async (req, res) => {
	await Posts.create(req.body);
	res.redirect("/");
});

app.get('/post/edit/:id', async (req, res) => {
	const postDetails = await Posts.findOne({_id: req.params.id});
	res.render("edit_post", {postDetails});
});

app.put('/post/:id', async (req, res) => {
	const postDetails       = await Posts.findOne({_id: req.params.id});
	postDetails.title       = req.body.title;
	postDetails.description = req.body.description;
	postDetails.save();

	res.redirect(`/post/${req.params.id}`);
});

app.delete('/post/:id', async (req, res) => {
	await Posts.findByIdAndRemove(req.params.id);
	res.redirect('/');
});


const port = 3000;
app.listen(port, () => {
	console.log(`Sunucu ${port} portunda başladı...`);
});