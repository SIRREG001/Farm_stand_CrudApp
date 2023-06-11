const mongoose = require('mongoose');
const Product = require('./models/product');

//connecting to mongo database
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection open!!!");
    })
.catch ((error) => {
    console.log("Oh no Mongo connection error");
    console.log(error);
});

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 2.99,
//     category: 'fruit'
// })
// p.save()
//     .then((p) => {
//         console.log(p)
//     })
//     .catch((e) => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 4.59,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    });