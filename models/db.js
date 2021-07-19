let MongoClient = require('mongodb').MongoClient;
// const Usermodel = require('./user_data');

let dbname, collection, client, url;

exports.passData = async (data) => {

    dbname = data.database;
    url = "mongodb://localhost:27017/";
    collection = data.collection;

};

//to add user Data
exports.addToDb = async (user) => {

    try {
        client = new MongoClient(url);

        await client.connect();

        const database = client.db("User");

        const movies = database.collection("movies");

        const result = await movies.insertOne(user);

    } finally {
        console.log('details added to DB');
    }

};
