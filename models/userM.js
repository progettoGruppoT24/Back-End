const mongoose = require("mongoose"); //import mongoose

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true, dropDups:true},                                
    email: {type:String, required:true, unique:true, dropDups: true},                               
    password: {type:String, required:true},                 
    nation: {type:String, required:true},                               
    isPremium: {type:Boolean, default:false}, 
    hasPlayedDailyChallenge: {type:Boolean, default:false},
    statisticheUtente: {sfideGiornaliereGiocate:{type:Number, default:0}, sfideGiornaliereVinte:{type:Number, default:0}, punteggioTraining:{type:Number, default:0}}
});

const user = mongoose.model('user', userSchema); //convert to model named User

module.exports = user; //export for controller use
