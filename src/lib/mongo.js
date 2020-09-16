require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbName = process.env.DB_NAME;

class MongoLib {
  constructor() {
    this.client = new MongoClient(dbUrl, {
      useUnifiedTopology: true
    });
    this.dbName = dbName
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected succesfully to mongo');
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.log(error)
      }
    }
    return MongoLib.connection
  }

  async getAll(collection) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find().toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect();
      return await db.collection(collection).findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.log(error);
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      const result = await db.collection(collection).insertOne(data);
      return result.insertedId;
    } catch (error) {
      console.log(error);
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect();
      const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      return result.upsertedId || id;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect();
      await db.collection(collection).deleteOne({ _id: ObjectId(id) });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = MongoLib;