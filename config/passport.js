const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
const dotenv = require('dotenv')
dotenv.config();




module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.SECRET_JWT;
    passport.use(new JwtStrategy(opts, (jwt_payload,done)=>{
         User.getUserById(jwt_payload.data._id,(err,user) => {
             if (err){
                 return done(err,false);
             }
             if (user){
                 return done(null,user);
             }
             else{
                 return done(null,false);
             }
         })
    }));

}
