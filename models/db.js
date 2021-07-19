let MongoClient = require('mongodb').MongoClient;

let dbname, collection, client, url, dbtype;

exports.passData = async (data) => {

    dbname = data.database;

    dbtype = data.dbtype;

    url = `${dbtype}://localhost:27017/`;

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
        
    }

};
