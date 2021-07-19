const mongoose = require('mongoose');
const Usermodel = require('./user_data');

let model;

exports.passData = async (data) => {
    
    const dbname = await data[5];

    const connection = mongoose.connect(`mongodb://localhost:27017/${dbname}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
        .then(() => console.log(`DB connection successful`));

    // console.log(Model);
    // return Model;
    model = await Usermodel.getUserCollection(data);

};

//to add user Data
exports.addToDb = async (user) => {
    let userData = await model.create(user);
    console.log(userData);
}

//to get user data
exports.getData = async (req, res) => {

    let model = await UserModel.Model.find({}, { _id: 0 });

    console.log(model);
}