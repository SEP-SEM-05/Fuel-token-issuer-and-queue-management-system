let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Org = require('../models/organization');

//save an organization to the database
const saveClient = (data) => {

    let client = new Org(data);

    client.save((err) => {
        if(err){
            return err;
        }
        else{
            return false;
        }
    });
}

//find an organization given the registration No.
const findClientByRegNo = async (nic) => {

    let client = await Org.findOne({registrationNo});
    return client;
}

//find an organization given the _id
const findClientByID = async (id) => {

    let client = await Org.findById(mongoose.Types.ObjectId(id));
    return client;
}

module.exports = {
    saveClient,
    findClientByRegNo,
    findClientByID,
}