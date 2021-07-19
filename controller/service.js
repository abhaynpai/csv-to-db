const UserModel = require('../models/db');
const fs = require('fs');
const csv = require('csv-parser');

exports.addDetailstoDb = async (arguments) => {
    try {
        fs.createReadStream(arguments[9])
            .pipe(csv())

            .on('data', function (row) {
                const user = {
                    first_name: row.first_name,
                    last_name: row.last_name,
                    date_of_birth: row.date_of_birth
                }
                UserModel.addToDb(user);
            })

            .on('end', function () {
                console.log('users added');
            })

    } catch (err) {
        console.log(err);
    }
};

