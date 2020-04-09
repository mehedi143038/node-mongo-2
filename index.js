const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const friends = ['Ashik', 'Noyon', 'Arif', 'Belal', 'Opurbo', 'Alam'];



app.get('/products', (req,res) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result);
            }
        })
        //client.close();
      });
})

app.get('/products/:key',(req, res)=>{
    const key = req.params.key;
    
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key}).toArray((err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result[0]);
            }
        })
        //client.close();
      });
})


app.post('/getProductsByKey',(req, res)=>{
    const key = req.params.key;
    const productKeys = req.body;
    console.log(productKeys);
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key: {$in: productKeys }}).toArray((err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result);
            }
        })
        //client.close();
      });
})

app.get('/products/mobile',(req,res)=>{
    res.send({product: "mobile", price: 10000, stock: 45})
})

app.post('/addProduct',(req,res)=>{
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insert(product, (err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        })
        //client.close();
      });
})

app.post('/placeOrder',(req,res)=>{
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    console.log(orderDetails);
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("orders");
        collection.insertOne(orderDetails, (err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        })
        //client.close();
      });
})

const port =process.env.PORT || 3000;

app.listen(port, () => console.log('listening to port 3000'));