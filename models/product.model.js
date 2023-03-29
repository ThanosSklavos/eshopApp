const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        product : {      //product name
            type: String, 
            required: [true, 'Product name is reaquired field'],
            max: 100,
            unique: true,
            trim: true,
            lowercase: true
        },
        cost: {
            type: Number, 
            required: [true, 'Cost of product is required field'],
            //max: 100
        },
        description: {
            type: String,
            max: 100,
        },
        quantity: {
            type: Number,
            max: 1000000
        }
    }, {
        collection: 'products', 
        timestamps: true
    });

    productSchema.plugin(uniqueValidator);

    module.exports = mongoose.model('Product', productSchema)

