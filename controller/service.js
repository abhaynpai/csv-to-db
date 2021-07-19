const UserModel = require('../models/db');
const fs = require('fs');

exports.addDetailstoDb = async (arguments) => {
    try {

        fs.readFile(arguments.filepath, 'utf8', function (err, data) {

            let dataArray = data.split(/\r?\n/);

            for (let i = 1; i < dataArray.length; i++) {
                
                let userData = dataArray[i].split(",");

                const user = {
                    first_name: userData[0],
                    last_name: userData[1],
                    date_of_birth: userData[2]
                }

                UserModel.addToDb(user);
            };

        });
        

    } catch (err) {
        console.log(err);
    }
};

