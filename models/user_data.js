const mongoose = require('mongoose');

exports.getUserCollection = async (data) => {

    const collection = await data[7];

    UserSchema = mongoose.Schema(
        {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            date_of_birth: {
                type: Date

            }
        },

        {
            timestamps: {
                createdAt: true,
                updateAt: true,
            },
        },
    );
    const Model = mongoose.model(`${collection}`, UserSchema);
    return Model;
    
};


