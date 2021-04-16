const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true,
        },
        category: {
            type: objectId,
            ref: "Category",
            required: true,
        },
        stock: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);
