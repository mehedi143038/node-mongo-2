const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = 'dbUser';
const pass = 'WHzUdfkz2c0UAm0o';

const friends = ['Ashik', 'Noyon', 'Arif', 'Belal', 'Opurbo', 'Alam'];

//database connnection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:WHzUdfkz2c0UAm0o@cluster0-64ttu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("onlineStore").collection("products");
  // perform actions on the collection object
  collection.insertOne({
      name:"Laptop",
      price: 200,
      stock: 2
  }, (err,res)=>{
      console.log('successfully inserted!');
  })
  console.log('Database connected')
  client.close();
});


const data = [
    {
        name: 'mehedi',
        job: 'web developer',
        salary: 50000,
        company:{
            name: "programming Hero",
            website: "www.progra.com",
            address: "invalid address"
        }
    },
    {
        name: 'hasan',
        job: 'web developer',
        salary: 45000,
        company:{
            name: "The mehedi Hasan",
            website: "www.mehedi.com",
            address: "invalid address"
        }
    }
]



app.get('/', (req,res) => {
    const product = {
        name: "moneyBag",
        price: 400
    }
    res.send(product);
})

app.get('/users/:id',(req, res)=>{
    const id = req.params.id;
    const query = req.query.sort;
    const name = friends[id];
    res.send({id,name});
    console.log(query);
})

app.get('/product/mobile',(req,res)=>{
    res.send({product: "mobile", price: 10000, stock: 45})
})

app.post('/addUser',(req,res)=>{
    const user = req.body;
    user.id = 33;
    res.send(user);
})

app.listen(4200, () => console.log('listening to port 4200'));