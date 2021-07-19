const mongo = require('mongodb').MongoClient;
const fs = require('fs');
const readline = require('readline');
const yargs = require('yargs');
const arguments = yargs.argv;

const printHelp = () => {
    console.log(`
Follow the following given parameter to use this tool -
    --dbtype            - Provides database type [mongodb, postgres]
    --database          - Name of the database
    --collection        - Name of the collection or the table
    --filepath          - Location of the file to be parsed
    --columns           - comma separated values of the columns
    `);
};

const printColumnHelp = () => {
    console.log(`
Please provide _id in column inorder to prevent Key Duplication Error
    `)
}

const parseFile = async () => {

    const FILE_PATH = arguments.filepath;

    const DB_TYPE = arguments.dbtype;

    const DB_NAME = arguments.database;

    const COLLECTION_NAME = arguments.collection;

    const COLUMNS = arguments.columns.split(",");

    if (!FILE_PATH || !DB_TYPE || !DB_NAME || !COLLECTION_NAME) {
        console.error('No correct value provided');
        printHelp();
        return;
    }

    if (!COLUMNS.includes("_id")){
        console.error('No correct value provided');
        printColumnHelp();
        return;
    }

    try {

        client = new mongo(`${DB_TYPE}://localhost:27017`);

        client.connect();

        const database = client.db(DB_NAME);

        const collection = database.collection(COLLECTION_NAME);

        const rl = readline.createInterface({
            input: fs.createReadStream(FILE_PATH),
            crlfDelay: Infinity
        });

        let user = {};

        let headers;

        let rowCount = 0;
        
        let needed_columns = [];

        for await (const line of rl) {
            if (rowCount == 0) {
                headers = line.split(',');

                for (let j = 0; j < headers.length; j++) {

                    if (COLUMNS.includes(headers[j])) {
                        needed_columns.push(j)
                    }
                }
                rowCount += 1;
            } else {

                rows = line.split(',');

                for (let j = 0; j < needed_columns.length; j++) {
                    var name = headers[needed_columns[j]]
                    user[name] = rows[j]
                }

                const result = await collection.insertOne(user);
            }

        }

    } catch (err) {
        console.log(err);
    }

};


parseFile();