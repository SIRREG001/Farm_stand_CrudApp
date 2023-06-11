//requiring modules
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')

//connecting to mongo database
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection open!!!");
    })
.catch ((error) => {
    console.log("Oh no Mongo connection error");
    console.log(error);
});
//mongoose.set('strictQuery', true);


//setting path and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({extended: true}));//this is used to remove the undefined default mode of req.body allow us to access the data user inputted in the form
app.use(methodOverride('_method'));

//array of categories
const categories = ['fruit', 'vegetable', 'dairy', 'beverage']

//Home endpoint or route
app.get('/products', async (req, res) =>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category})
        res.render('products/index', {products, category})
    } 
    else{
        const products = await Product.find({})
        res.render('products/index', {products, category: 'All'})
    }
});

//Creating a new product
app.get('/products/new', (req, res) =>{
    res.render('products/new', {categories})
})
app.post('/products', async (req, res) =>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

//Fetching the product page
app.get('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product})
})

//Updating/Editing a product
app.get('/products/:id/edit', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})
app.put('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    res.redirect(`/products/${product._id}`);
})

//Deleting Product
app.delete('/products/:id', async (req, res) =>{
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
//configuring port
app.listen(3000, () => {
    console.log("app is listening on port 3000!!")
})