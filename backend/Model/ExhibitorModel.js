
const mongoose = require("mongoose");

const exhibitorSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    contactPerson: String,
    email: {
        type: String,
        required: true
    },
    phone: String,
    website: String,
    category: String,
    products: String,
    address: String,
    description: String
});

module.exports = mongoose.model("Exhibitor", exhibitorSchema);
