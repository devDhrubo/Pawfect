const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vxqz6e2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const petCol = client.db('pawfectDB').collection('petCollection');
    const adoptPetCol = client.db('pawfectDB').collection('adoptPetCollection');
    const userCol = client.db('pawfectDB').collection('users');
    const donationCol = client.db('pawfectDB').collection('donation');


    // jwt

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
      })
      res.send({ token })
    })

    app.post('/pet', async (req, res) => {
      const item = req.body;
      const result = await petCol.insertOne(item);
      res.send(result);
    })

    app.get('/pet', async (req, res) => {
      const result = await petCol.find().toArray();
      res.send(result);
    })

    app.get('/pet/:email', async (req, res) => {
      const result = await petCol.find({ email: req.params.email }).toArray();
      res.send(result);
    })


    // for update
    app.get('/pet/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await petCol.findOne(query);
      res.send(result);
    })

    app.delete('/added-pet/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await petCol.deleteOne(query);
      res.send(result);
    })

    app.patch('/pet/adopt/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          adopted: 'Adopted'
        }
      }
      const result = await petCol.updateOne(filter, updateDoc);
      res.send(result);
    })

    app.post('/adoption', async (req, res) => {
      const newPet = req.body;
      const result = await adoptPetCol.insertOne(newPet);
      res.send(result);
    })

    // middleware
    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Forbidden Access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        next();
      })

    }

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCol.findOne(query);
      const isAdmin = user.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: "Unauthorized Access" });
      }
      next();
    }


    app.get('/users', verifyToken, async (req, res) => {
      const result = await userCol.find().toArray();
      res.send(result);
    })


    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await userCol.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exists' });
      }
      const result = await userCol.insertOne(user);
      res.send(result);
    })

    app.post('/donation', async (req, res) => {
      const item = req.body;
      const result = await donationCol.insertOne(item);
      res.send(result);
    })

    app.get('/donation/:email', async (req, res) => {
      const result = await donationCol.find({ email: req.params.email }).toArray();
      res.send(result);
    })

    app.get('/donation', async (req, res) => {
      const result = await donationCol.find().toArray();
      res.send(result);
    })


    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        res.status(403).send('Unauthorized Access');
      }
      const query = { email: email }
      const user = await userCol.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin'
      }
      res.send({ admin })
    })

    app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCol.updateOne(filter, updateDoc);
      res.send(result);
    })

    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    app.get('/donation/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await donationCol.findOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Pawfect is Waiting For You');
});

app.listen(port, () => {
  console.log(`Server is Setting on port ${port}`);
});


