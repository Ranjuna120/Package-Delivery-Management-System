const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderqueueSchema = new Schema({
    orderid : {
        type : String,
        required : true
    },
    machineid:{
        type: String,
        required : true
    }
    

    


})

const Orderqueue = mongoose.model("Orderqueue",orderqueueSchema);
module.exports = Orderqueue; 