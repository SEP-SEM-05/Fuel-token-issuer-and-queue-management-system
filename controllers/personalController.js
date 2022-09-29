let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get personal client dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await personalDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByNic(user.nic);

            res.json({
                status: 'ok',
                user: user,
                vehicles: vehicles,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//register a vehicle and add stations to it or change stations of an alredy registered one
const register_and_change_stations = async (req, res) => {

    let regNo = req.body.registrationNo;
    let stations = req.body.stations;

    try {
        //handle any possible errors
        let result = await vehicleDBHelper.updateStationsAndRegister(regNo, stations);
        //return necessary data
        res.json({
            status: 'ok',
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

module.exports = {
    get_dashboard,
    register_and_change_stations,
}