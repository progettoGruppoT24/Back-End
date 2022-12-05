
const mongoose = require("mongoose"); //import mongoose

const userSchema = new mongoose.Schema({
    username: {type:String},                                //Required, unique
    email: {type:String},                                   //Required, unique
    password: {type:String, required:true},                 //Required
    nation: {type:String},                                  //Required
    premiumUser: {type:Boolean},                            //Default = false? Uno non crea un account già premium
    points: {type:Int},                                     //Default = 0
    dailtGamesPlayed: {type:Int},                           //Default = 0
    dailyVictories: {type:Int},                             //Default = 0
    //dailyRateo: {type:Real},                              //Default = 0
});


const User = mongoose.model('User', userSchema); //convert to model named User

module.exports = User; //export for controller use