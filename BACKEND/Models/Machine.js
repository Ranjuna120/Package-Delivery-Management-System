const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MachineSchema = new Schema({
    machineName : {
        type : String,
        required : true
    },
    machineCategory : {
        type : String,
        required : true
    },
    durationTime:{
        type: Number,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    qualityDetails:{
        type:String,
        required:true
    }


})

const Machine = mongoose.model("Machine",MachineSchema);
module.exports = Machine; 