const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const dbUrl = process.env.BD_URI;

MongoClient.connect(
  dbUrl,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, database) => {
    if (err) return console.log(err);
    console.log("Connected to Database");
    db = database.db("quotes");
  }
);

const app = express();
app.use(bodyParser.json());
// const actionDB = db.collection("quotes");

app.get("/", (request, response) => {
  response.send("¡Hola Mundo!");
});

app.get("/quotes", async (request, response) => {
  try {
    const data = await db.collection("quotes").find({}).toArray();
    response.json(data);
  } catch (err) {
    response.json(err.message);
  }
  // db.collection("quotes")
  //   .find({})
  //   .toArray()
  //   .then((result) => response.json(result));
});

app.post("/quotes", async (request, response) => {
  // db.collection("quotes")
  //   .insertOne(request.body)
  //   .then((data) => response.json(data))
  //   .catch((err) => response.json(err));
  try {
    await db.collection("quotes").insertOne(request.body);
    response.json("Agregado correctamente");
  } catch (err) {
    response.json(err);
  }
});

app.put("/quotes", async (request, response) => {
  // db.collection("quotes")
  //   .findOneAndUpdate(
  //     { _id: ObjectId(request.body._id) },
  //     {
  //       $set: {
  //         name: request.body.name,
  //         quote: request.body.quote,
  //       },
  //     },
  //     { upsert: true }
  //   )
  //   .then((data) => response.json(data))
  //   .catch((err) => response.json(err));
  try {
    await db.collection("quotes").findOneAndUpdate(
      { _id: ObjectId(request.body._id) },
      {
        $set: {
          name: request.body.name,
          quote: request.body.quote,
        },
      },
      { upsert: true }
    );
    response.json("Modificado correctamente");
  } catch (error) {
    response.json(error);
  }
});

app.delete("/quotes", async (request, response) => {
  // db.collection("quotes")
  //   .deleteOne({ _id: ObjectId(request.body._id) })
  //   .then((data) => response.json(data))
  //   .catch((err) => response.json(err));

  try {
    await db
      .collection("quotes")
      .deleteOne({ _id: ObjectId(request.body._id) });
    response.json("Eliminado correctamente");
  } catch (error) {
    response.json(error);
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Servidor funcionando http://localhost:${process.env.PORT || 8000}`
  );
});
