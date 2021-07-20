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

const parseFile = async () => {

    const FILE_PATH = arguments.filepath;
    const DB_TYPE = arguments.dbtype;
    const DB_NAME = arguments.database;
    const COLLECTION_NAME = arguments.collection;
    const COLUMNS = arguments.columns;

    try {

        if (!FILE_PATH || typeof FILE_PATH !== 'string') {
            console.error('File Path is not provided');
            printHelp();
            return;
        }

        if (!DB_TYPE || typeof DB_TYPE !== 'string') {
            console.error('DB Type is not provided');
            printHelp();
            return;
        }
        if (!DB_NAME || typeof DB_NAME !== 'string') {
            console.error('DB Name is not provided');
            printHelp();
            return;
        }
        if (!COLLECTION_NAME || typeof COLLECTION_NAME !== 'string') {
            console.error('Collection name is not provided');
            printHelp();
            return;
        }

        if (!COLUMNS || typeof COLUMNS !== 'string') {
            console.error('Columns are not provided');
            printHelp();
            return;
        }

        const documentColumns = COLUMNS.split(",");

        if (!documentColumns.includes("_id")) {
            console.error('Please provide _id in column inorder to prevent Key Duplication Error');
            return;
        }

        //setup the DB connection
        var client = new mongo(`${DB_TYPE}://localhst:27017`);
        client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(COLLECTION_NAME);

        const rl = readline.createInterface({
            input: fs.createReadStream(FILE_PATH),
            crlfDelay: Infinity
        });

        const document = {};
        let headers;
        let rowCount = 0;
        const neededColumns = [];

        for await (const line of rl) {
            if (rowCount == 0) {
                headers = line.split(',');

                for (let j = 0; j < headers.length; j++) {
                    if (documentColumns.includes(headers[j])) {
                        neededColumns.push(j)
                    }
                }
                rowCount += 1;

            } else {
                const rows = line.split(',');

                for (let j = 0; j < neededColumns.length; j++) {
                    var name = headers[neededColumns[j]]
                    document[name] = rows[j]
                }

                try {
                    const result = await collection.insertOne(document);
                    console.log(result);
                } catch (err) {
                    console.error(err.message);
                }
            }
        }

        //  close the DB connection
        client.close();

    } catch (err) {
        if (err.message.includes('connected')) {
            console.error('MongoDB Connection Error');
            return;
        }
        else {
            console.log(err.message);
            printHelp();
            return;
        }
    }
};

parseFile();